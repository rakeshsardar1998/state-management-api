import fs from 'fs';
import path from 'path';
import { saveImageToDB, getImageFromDB } from '../models/imageModel.js';
import { resizeImage } from '../utils/imageUtils.js';

// Function to handle image upload
export const uploadImage = (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).send('No file uploaded.');
    return;
  }

  try {
    const fileName = file.filename;
    const imageData = fs.readFileSync(path.join('uploads', file.filename));
    saveImageToDB(fileName, imageData)
      .then(() => {
        res.status(201).json({ message: 'Image uploaded successfully!' });
      })
      .catch(err => {
        res.status(500).json({ message: 'Error saving image to database', error: err });
      });
  } catch (error) {
    res.status(500).json({ message: 'Error reading the file', error });
  }
};

// Function to get a resized image
export const getResizedImage = async (req, res) => {
  const { fileName, width, height } = req.query;

  if (!fileName || !width || !height) {
    return res.status(400).json({ message: 'Missing query parameters' });
  }

  try {
    const image = await getImageFromDB(fileName);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const buffer = await resizeImage(image.image_data, parseInt(width), parseInt(height));
    res.writeHead(200, { 'Content-Type': 'image/jpeg' });
    res.end(buffer, 'binary');
  } catch (error) {
    res.status(500).json({ message: 'Error processing the image', error });
  }
};
