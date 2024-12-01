import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();

router.post("/", UserController.createUserController);
router.get("/", UserController.getAllUsersController);
router.get("/:id", UserController.getUserByIdController);
router.put("/:id", UserController.updateUserController);
router.delete("/:id", UserController.softDeleteUserController);

export default router;
