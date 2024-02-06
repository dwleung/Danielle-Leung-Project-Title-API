import express from "express";
const router = express.Router();
import userController from "../controllers/user-controller.js";
import authorize from "../middleware/authorize.js";

// All routes used after user login will go through authorize middleware to verify user

router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login);
router.route("/profile").get(authorize.authorize, userController.getProfile);

router
	.route("/ideas")
	.post(authorize.authorize, userController.saveIdea)
	.get(authorize.authorize, userController.getIdeas);

router
	.route("/prompts")
	.post(authorize.authorize, userController.savePrompt)
	.get(authorize.authorize, userController.getPrompts);

export default router;
