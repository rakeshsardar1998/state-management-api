import {
  uploadImage,
  getResizedImage,
} from "../controllers/imageController.js";

export default (req, res) => {
  if (req.url.startsWith("/upload") && req.method === "POST") {
    uploadImage(req, res);
  } else if (req.url.startsWith("/image") && req.method === "GET") {
    getResizedImage(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
};
