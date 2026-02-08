import AppError from "../errors/AppError";

const slugify = (text: string): string => {
  if (!text) {
    throw new AppError(400, "A name must be provided to slugify");
  }
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Remove duplicate hyphens
};

export default slugify;
