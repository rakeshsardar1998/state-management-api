import sharp from 'sharp';

export const resizeImage = async (imageBuffer, width, height) => {
  try {
    const resizedImage = await sharp(imageBuffer)
      .resize(width, height)
      .toBuffer();
    return resizedImage;
  } catch (error) {
    console.error('Error resizing image:', error);
    throw error;
  }
};
