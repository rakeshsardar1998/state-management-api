import pool from '../config/db.config.js';

export const saveImageToDB = async (fileName, imageData) => {
  try {
    const query = 'INSERT INTO images (file_name, image_data) VALUES (?, ?)';
    await pool.query(query, [fileName, imageData]);
  } catch (error) {
    console.error('Error inserting image into database:', error);
    throw error;
  }
};

export const getImageFromDB = async (fileName) => {
  try {
    const query = 'SELECT file_name, image_data FROM images WHERE file_name = ?';
    console.log('Executing query:', query, 'with fileName:', fileName);
    const [rows] = await pool.query(query, [fileName]);

    if (rows.length === 0) {
      console.log('No image found.');
      return null;
    }

    return rows[0];
  } catch (error) {
    console.error('Error retrieving image from database:', error);
    throw error;
  }
};

