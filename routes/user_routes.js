import express from "express";
const router = express.Router();
import userController from "../controllers/user-controller.js";

router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login);
router
	.route("/profile")
	.get(userController.authorize, userController.getProfile);

router
	.route("/:id/ideas")
	.post(userController.saveIdea)
	.get(userController.getIdeas);

router
	.route("/:id/prompts")
	.post(userController.savePrompt)
	.get(userController.getPrompts);

export default router;
