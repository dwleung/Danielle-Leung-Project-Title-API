import dotenv from "dotenv";
import knexLibrary from "knex";
import knexfile from "../knexfile.js";
import jwt from "jsonwebtoken";
dotenv.config();
const knex = knexLibrary(knexfile);
const SECRET_KEY = process.env.SECRET_KEY;

const authorize = async (req, res, next) => {
	if (!req.headers.authorization) {
		return res
			.status(201)
			.send("Authorization token not included. Please log in.");
	}
	const token = req.headers.authorization.split(" ")[1];
	try {
		const decoded = jwt.verify(token, SECRET_KEY);
		req.user = decoded;
		console.log("decoded:", decoded);
		console.log("req.user: ", req.user);
	} catch (error) {
		res.status(400).json({
			message: `Invalid authorization token: ${error}`,
		});
	}

	try {
		const user = await knex("users").where({ id: req.user.id }).first();
		console.log("User found in database:", user);
		req.userId = user.id;
		console.log(req);
		next();
	} catch (error) {
		return res.status(400).json({ message: `User not found: ${error}` });
	}
};

export default { authorize };
