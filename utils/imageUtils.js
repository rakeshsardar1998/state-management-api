import { createCanvas, loadImage } from "canvas";

// Function to resize an image to the given dimensions
export const resizeImage = async (imageBuffer, width, height) => {
  const image = await loadImage(imageBuffer);
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(image, 0, 0, width, height);
  return canvas.toBuffer("image/jpeg");
};
