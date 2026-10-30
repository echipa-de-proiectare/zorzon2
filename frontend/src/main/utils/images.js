const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

const FORMATS = ["thumbnail", "small", "medium", "large"];

// Absolute URL of a Strapi image
export const imageUrl = (image) => `${API_URL}${image.url}`;

// Build a srcSet from the widths Strapi actually generated for this image
export const imageSrcSet = (image) => {
  const sources = FORMATS.map((format) => image.formats?.[format])
    .filter((source) => source?.url && source?.width)
    .map((source) => ({ url: source.url, width: source.width }));

  if (image.width) {
    sources.push({ url: image.url, width: image.width });
  }

  return sources
    .sort((a, b) => a.width - b.width)
    .map((source) => `${API_URL}${source.url} ${source.width}w`)
    .join(", ");
};

// Smallest generated format that is at least minWidth wide, for the src fallback
export const imageFallbackUrl = (image, minWidth = 500) => {
  const format = FORMATS.map((name) => image.formats?.[name]).find(
    (source) => source?.url && source.width >= minWidth
  );
  return `${API_URL}${format?.url || image.url}`;
};
