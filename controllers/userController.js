import UserModel from '../models/userModel.js';
import { uploadImage } from './imageController.js';

const UserController = {
  createUserController: async (req, res) => {
    try {
      const { name, email } = req.body;
      const imageFile = req.file;

      if (!name || !email || !imageFile) {
        return res.status(400).json({ error: "Name, email, and image are required" });
      }

      // Save the image and get the image path
      const imagePath = imageFile.filename;

      // Create the user with the image path
      const userId = await UserModel.createUser({ name, email }, imagePath);

      res.status(201).json({ message: "User created successfully", userId });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Error creating user" });
    }
  },
  getUserByIdController: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await UserModel.getUserById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getAllUsersController: async (req, res) => {
    try {
      const users = await UserModel.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  updateUserController: async (req, res) => {
    try {
      const id = req.params.id;
      const updatedDetails = req.body;
      const updatedRows = await UserModel.updateUser(id, updatedDetails);
      res.status(200).json({ message: `${updatedRows} user(s) updated successfully` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  softDeleteUserController: async (req, res) => {
    try {
      const id = req.params.id;
      const deletedRows = await UserModel.softDeleteUser(id);
      res.status(200).json({ message: `${deletedRows} user(s) marked as deleted successfully` });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default UserController;
