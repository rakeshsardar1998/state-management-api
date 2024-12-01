import { promises as fs } from "fs";
import { saveImageToDB, getImageFromDB } from "../models/imageModel.js";
import { resizeImage } from "../utils/imageUtils.js";

// Function to handle image upload
export const uploadImage = async (req, res) => {
  const files = req.files; // Handle multiple files
  console.log("Uploaded Files:", files);

  if (!files || files.length === 0) {
    return res.status(400).json({ message: "No files were uploaded." });
  }

  try {
    await Promise.all(
      files.map(async (file) => {
        const imageData = await fs.readFile(file.path);
        await saveImageToDB(file.originalname, imageData);
        // Remove the file from the disk
        await fs.unlink(file.path);
      })
    );

    res.status(201).json({ message: "Images uploaded successfully!" });
  } catch (error) {
    console.error("Error while uploading images:", error);
    res.status(500).json({ message: "Error uploading images." });
  }
};

export const getResizedImage = async (req, res) => {
  const { fileName, width, height } = req.query;

  if (!fileName || !width || !height) {
    return res
      .status(400)
      .json({
        message: "Missing required query parameters: fileName, width, height.",
      });
  }

  try {
    console.log("Requested File:", fileName);
    const image = await getImageFromDB(fileName);

    if (!image || !image.image_data) {
      console.log("Image not found in the database.");
      return res.status(404).json({ message: "Image not found." });
    }

    console.log("Image data retrieved:", image);
    const resizedBuffer = await resizeImage(
      image.image_data,
      parseInt(width, 10),
      parseInt(height, 10)
    );

    res.writeHead(200, { "Content-Type": "image/jpeg" });
    res.end(resizedBuffer, "binary");
  } catch (error) {
    console.error("Error resizing image:", error);
    res.status(500).json({ message: "Error processing image." });
  }
};
