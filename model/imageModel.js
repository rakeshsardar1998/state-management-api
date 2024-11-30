import mysql from 'mysql';
import config from '../config/config.js';

// Create a single connection to the MySQL database
const connection = mysql.createConnection({
  host: config.db.host,
  port: config.db.port || 3306,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
});

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
    throw err;
  }
  console.log('Database connected');
});

// Function to save an image to the database
export const saveImageToDB = (fileName, fileContent) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO images (file_name, image_data) VALUES (?, ?)';
    connection.query(query, [fileName, fileContent], (error, results) => {
      if (error) {
        console.error('Error saving image to database:', error);
        return reject(error);
      }
      resolve(results);
    });
  });
};

// Function to retrieve an image from the database
export const getImageFromDB = (fileName) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT file_name, image_data FROM images WHERE file_name = ?';
    connection.query(query, [fileName], (error, results) => {
      if (error) {
        console.error('Error retrieving image from database:', error);
        return reject(error);
      }
      resolve(results[0]);
    });
  });
};
