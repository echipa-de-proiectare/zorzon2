const API_URL = import.meta.env.VITE_API_URL; // Access the environment variable

const FORMATS = ["thumbnail", "small", "medium", "large", "xlarge"];

// Build a srcSet from the widths Strapi actually generated for this image.
// The original is left out on purpose: it can be several MB.
export const imageSrcSet = (image) => {
  const sources = FORMATS.map((format) => image.formats?.[format])
    .filter((source) => source?.url && source?.width)
    .map((source) => ({ url: source.url, width: source.width }));

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
