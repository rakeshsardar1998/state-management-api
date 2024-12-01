import sharp from 'sharp';

// Resize image using sharp
export const resizeImage = async (buffer, width, height) => {
  try {
    return await sharp(buffer).resize(width, height).toBuffer();
  } catch (error) {
    console.error('Error resizing image:', error);
    throw error;
  }
};
