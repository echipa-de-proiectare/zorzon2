"use strict";

/**
 * One-off: add an "xlarge" (up to 1600px wide) JPEG format to uploaded images
 * that are wider than their largest format, and replace the formats of opaque
 * PNGs with JPEGs. Without this the site falls back to multi-MB originals on
 * retina screens.
 *
 * Usage (from the backend folder or container):
 *   node scripts/optimize-images.js           # dry run
 *   node scripts/optimize-images.js --apply   # write files and update the DB
 */

const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const { Client } = require("pg");

require("dotenv").config();

const APPLY = process.argv.includes("--apply");
const UPLOADS_DIR = path.join(__dirname, "..", "public", "uploads");
const XLARGE_WIDTH = 1600;
const FORMAT_NAMES = ["thumbnail", "small", "medium", "large"];
const JPEG_OPTIONS = { quality: 80, mozjpeg: true };

const toFormat = async (buffer, name, hash) => {
  const { width, height, size } = await sharp(buffer).metadata();
  return {
    ext: ".jpg",
    url: `/uploads/${hash}.jpg`,
    hash,
    mime: "image/jpeg",
    name,
    path: null,
    size: Math.round((size || buffer.length) / 10.24) / 100,
    sizeInBytes: buffer.length,
    width,
    height,
  };
};

const writeJpeg = async (source, width, hash) => {
  const buffer = await sharp(source)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .jpeg(JPEG_OPTIONS)
    .toBuffer();
  if (APPLY) fs.writeFileSync(path.join(UPLOADS_DIR, `${hash}.jpg`), buffer);
  return buffer;
};

const optimize = async (file) => {
  const source = path.join(UPLOADS_DIR, `${file.hash}${file.ext}`);
  if (!fs.existsSync(source)) return { skipped: "missing original" };

  const formats = { ...(file.formats || {}) };
  const changes = [];
  const baseName = file.name.replace(/\.[^.]+$/, ".jpg");

  // Opaque PNG renders are much smaller as JPEG at the same size
  if (file.ext === ".png") {
    const { hasAlpha } = await sharp(source).stats().then((stats) => ({
      hasAlpha: !stats.isOpaque,
    }));
    if (!hasAlpha) {
      for (const name of FORMAT_NAMES) {
        const format = formats[name];
        if (!format || format.ext === ".jpg") continue;
        const hash = `${name}_${file.hash}`;
        const buffer = await writeJpeg(source, format.width, hash);
        formats[name] = await toFormat(buffer, `${name}_${baseName}`, hash);
        changes.push(`${name} ${format.size}KB -> ${formats[name].size}KB`);
      }
    }
  }

  const largest = Math.max(
    0,
    ...FORMAT_NAMES.map((name) => formats[name]?.width || 0)
  );
  if (!formats.xlarge && file.width > largest * 1.2) {
    const hash = `xlarge_${file.hash}`;
    const buffer = await writeJpeg(source, XLARGE_WIDTH, hash);
    if (buffer.length < Number(file.size) * 1024) {
      formats.xlarge = await toFormat(buffer, `xlarge_${baseName}`, hash);
      changes.push(`xlarge ${formats.xlarge.width}px ${formats.xlarge.size}KB (original ${file.size}KB)`);
    }
  }

  return { formats, changes };
};

const main = async () => {
  const client = new Client({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  });
  await client.connect();

  const { rows } = await client.query(
    "select id, name, hash, ext, width, size, formats from files where mime in ('image/jpeg', 'image/png') order by id"
  );

  let updated = 0;
  for (const file of rows) {
    const result = await optimize(file);
    if (result.skipped) {
      console.log(`#${file.id} ${file.name}: skipped (${result.skipped})`);
      continue;
    }
    if (result.changes.length === 0) continue;
    console.log(`#${file.id} ${file.name}: ${result.changes.join(", ")}`);
    if (APPLY) {
      await client.query("update files set formats = $1 where id = $2", [
        JSON.stringify(result.formats),
        file.id,
      ]);
    }
    updated++;
  }

  console.log(`${APPLY ? "Updated" : "Would update"} ${updated} of ${rows.length} images`);
  await client.end();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
