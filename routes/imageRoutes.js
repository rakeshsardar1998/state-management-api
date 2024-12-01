import express from "express";
import multer from "multer";
import {
  uploadImage,
  getResizedImage,
} from "../controllers/imageController.js";

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Routes
router.post("/upload", upload.array("images", 10), uploadImage);
router.get("/image", getResizedImage);

export default router;
