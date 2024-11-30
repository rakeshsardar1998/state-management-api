import pool from '../config/db.config.js';

export const saveImageToDB = async (fileName, imageData) => {
  try {
    const query = 'INSERT INTO images (file_name, image_data) VALUES ($1, $2)';
    await pool.query(query, [fileName, imageData]);
  } catch (error) {
    console.error('Error inserting image into database:', error);
    throw error;
  }
};

export const getImageFromDB = async (fileName) => {
  try {
    const query = 'SELECT file_name, image_data FROM images WHERE file_name = $1';
    const result = await pool.query(query, [fileName]);
    return result.rows[0];
  } catch (error) {
    console.error('Error retrieving image from database:', error);
    throw error;
  }
};
