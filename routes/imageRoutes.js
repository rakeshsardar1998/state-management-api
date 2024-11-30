import express from 'express';
import multer from 'multer';
import { uploadImage, getResizedImage } from '../controllers/imageController.js';

const router = express.Router();
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post('/upload', upload.single('image'), uploadImage);
router.get('/image', getResizedImage);

export default router;
