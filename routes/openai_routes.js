import { OpenAI } from "openai";
import dotenv from "dotenv";
import express from "express";
const router = express.Router();
dotenv.config();

// const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
	const response = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "system",
				content: "Your task is to generate a brief software engineering project idea for a developer of a beginner skill level. The project should have 3 requirements that helps the user understand what to integrate in the project. Your response should be structured as a JSON object with keys: title, description, and requirements.",
			},
			{
				role: "user",
				content: "Provide a fun random software engineering project idea",
			},
		],
		temperature: 0.8,
		max_tokens: 200,
		response_format: { type: "json_object" },
	});
	res.status(200).send(response.choices[0].message);
});

//custom prompt
router.post("/custom", async (req, res) => {
	res.status.send("You've made it to openai/custom");
	// const response = await openai.chat.completions.create({
	// 	model: "gpt-3.5-turbo",
	// 	messages: [
	// 		{
	// 			role: "system",
	// 			content: "You will be provided with a set of interests and skills, and your task is to generate a software engineering project title, description, and 2-3 requirements using at least one interest and at least one skill.",
	// 		},
	// 		{
	// 			role: "user",
	// 			content: "",
	// 		},
	// 	],
	// 	temperature: 0.8,
	// 	max_tokens: 256,
	// });
	// res.status(200).console.log(response.choices[0].message);
});

export default router;
