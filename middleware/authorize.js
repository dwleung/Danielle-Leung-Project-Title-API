import dotenv from "dotenv";
import knexLibrary from "knex";
import knexfile from "../knexfile.js";
import jwt from "jsonwebtoken";
dotenv.config();
const knex = knexLibrary(knexfile);
const SECRET_KEY = process.env.SECRET_KEY;

// AUTHORIZE MIDDLEWARE: check for token, verify token, find user ID and add it to request body
const authorize = async (req, res, next) => {
	if (!req.headers.authorization) {
		return res
			.status(401)
			.send("Authorization token not included. Please log in.");
	}
	const token = req.headers.authorization.split(" ")[1];
	try {
		const decoded = jwt.verify(token, SECRET_KEY);
		req.user = decoded;
	} catch (error) {
		return res.status(401).json({
			message: `Invalid authorization token: ${error}`,
		});
	}

	try {
		const user = await knex("users").where({ id: req.user.id }).first();
		req.body.user_id = user.id;
		next();
	} catch (error) {
		return res.status(404).json({ message: `User not found: ${error}` });
	}
};

export default { authorize };
