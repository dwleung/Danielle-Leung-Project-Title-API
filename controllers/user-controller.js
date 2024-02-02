import dotenv from "dotenv";
import knex from "knex";
import "../knexfile.js";
// const knex = require("knex")(require("../knexfile.cjs"));
dotenv.config();

// router.route("/").post(userController.add);

const add = async (req, res) => {
	const { username, name, password } = req.body;

	if (!username || !name || !password) {
		return res.status(400).json({
			message: "Please provide a name, username, and password to sign up.",
		});
	}
	try {
		// console.log(1);
		const result = await knex("users").insert(req.body);
		// console.log(2);
		const newUserId = result[0];
		// console.log(3);
		const createdUser = await knex("users").where({ id: newUserId });
		// console.log(4);

		res.status(201).json(createdUser);
	} catch (error) {
		res.status(500).json({
			message: `Unable to create new user: ${error}`,
		});
	}
};

// router
// 	.route("/:id/ideas")
// 	.get(userController.ideas)
// 	.get(userController.prompts);

// router
// 	.route("/:id/")
// 	.get(userController.findUser)
// 	.patch(userController.update)
// 	.delete(userController.remove);

export default { add };
