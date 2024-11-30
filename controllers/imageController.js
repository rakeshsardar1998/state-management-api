import fs from "fs";
import path from "path";
import { saveImageToDB, getImageFromDB } from "../model/imageModel.js";
import { resizeImage } from "../utils/imageUtils.js";

// Function to handle image upload
export const uploadImage = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", async () => {
    try {
      const { fileName, fileContent } = JSON.parse(body);
      const buffer = Buffer.from(fileContent, "base64");

      // Save the image to the database
      await saveImageToDB(fileName, buffer);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Image uploaded successfully!" }));
    } catch (error) {
      console.error(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Error uploading image");
    }
  });
};

// Function to get a resized image
export const getResizedImage = async (req, res) => {
  const urlParams = new URLSearchParams(req.url.split("?")[1]);
  const fileName = urlParams.get("fileName");
  const width = parseInt(urlParams.get("width"), 10);
  const height = parseInt(urlParams.get("height"), 10);

  try {
    const image = await getImageFromDB(fileName);

    if (!image) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Image not found");
      return;
    }

    // Resize the image
    const resizedBuffer = await resizeImage(image.image_data, width, height);

    res.writeHead(200, { "Content-Type": "image/jpeg" });
    res.end(resizedBuffer, "binary");
  } catch (error) {
    console.error(error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Error processing image");
  }
};
