import express from "express";
import imageRoutes from "./routes/imageRoutes.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", imageRoutes);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
