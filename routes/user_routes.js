import express from "express";
const router = express.Router();
import userController from "../controllers/user-controller.js";

router.route("/").post(userController.add);

router.route("/:id/ideas");
// 	.get(userController.ideas);
// 	.get(userController.prompts);

// router
// 	.route("/:id/")
// 	.get(userController.findUser)
// 	.patch(userController.update)
// 	.delete(userController.remove);

export default router;
