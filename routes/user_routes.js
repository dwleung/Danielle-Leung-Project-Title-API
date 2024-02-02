import express from "express";
const router = express.Router();
import userController from "../controllers/user-controller.js";

router.route("/signup").post(userController.signup);

router.route("/login").post(userController.login);

router
	.route("/:id/ideas")
	.post(userController.saveIdea)
	.post(userController.savePrompt)
	.get(userController.getIdeas);

export default router;
