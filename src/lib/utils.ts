import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { ImageMetadata } from "astro"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDatetime = (datetime: any) => {
  const d = new Date(datetime);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  });
};

const contentImages = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/**/*.{png,jpg,jpeg,webp,gif,svg}',
  { eager: true }
);

export function resolveCoverImage(
  cover: ImageMetadata | string,
  collection: 'projects' | 'posts' = 'projects'
): ImageMetadata {
  if (typeof cover !== 'string') {
    return cover;
  }
  const normalized = cover.replace(/^\.\//, `/src/content/${collection}/`);
  if (contentImages[normalized]) {
    return contentImages[normalized].default;
  }
  const suffix = cover.replace(/^\.\//, '');
  for (const [key, mod] of Object.entries(contentImages)) {
    if (key.endsWith(suffix)) {
      return mod.default;
    }
  }
  throw new Error(`Could not resolve cover image: ${cover}`);
}
