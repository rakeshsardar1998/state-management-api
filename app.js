import http from 'http';
import imageRouter from './routes/imageRoutes.js';
import config from './config/config.js';

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/image') || req.url.startsWith('/upload')) {
    imageRouter(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
});
