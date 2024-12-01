import pool from '../config/db.config.js';

const UserModel = {
  createUser: async (userDetails, imagePath) => {
    try {
      const query = `INSERT INTO users (name, email, image, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())`;
      const [result] = await pool.query(query, [
        userDetails.name,
        userDetails.email,
        imagePath, 
      ]);
      return result.insertId;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
  getUserById: async (id) => {
    try {
      const query = `SELECT * FROM users WHERE id = ? AND deletedAt IS NULL`;
      const [rows] = await pool.query(query, [id]);
      return rows[0];
    } catch (error) {
      console.error("Error retrieving user by ID:", error);
      throw error;
    }
  },
  getAllUsers: async () => {
    try {
      const query = `SELECT * FROM users WHERE deletedAt IS NULL`;
      const [rows] = await pool.query(query);
      return rows;
    } catch (error) {
      console.error("Error retrieving all users:", error);
      throw error;
    }
  },
  updateUser: async (id, updatedDetails) => {
    try {
      const query = `UPDATE users SET name = ?, email = ?, updatedAt = NOW() WHERE id = ? AND deletedAt IS NULL`;
      const [result] = await pool.query(query, [
        updatedDetails.name,
        updatedDetails.email,
        id,
      ]);
      if (result.affectedRows === 0) {
        throw new Error("User not found or already deleted");
      }
      return result.affectedRows;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },
  softDeleteUser: async (id) => {
    try {
      const query = `UPDATE users SET deletedAt = NOW() WHERE id = ? AND deletedAt IS NULL`;
      const [result] = await pool.query(query, [id]);
      if (result.affectedRows === 0) {
        throw new Error("User not found or already deleted");
      }
      return result.affectedRows;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
};

export default UserModel;
