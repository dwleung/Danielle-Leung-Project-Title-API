import { OpenAI } from "openai";
import dotenv from "dotenv";
import express from "express";
const router = express.Router();
dotenv.config();

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

router.post("/custom", async (req, res) => {
	console.log("You've made it to openai/custom");
	console.log(req.body);
	const response = await openai.chat.completions.create({
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "system",
				content: "You will be provided with a set of interests and skills, and your task is to generate a software engineering project idea that includes at least one interest and at least one skill. Include maximum 3 requirements. Keep the response below 400 words. Format your response in a JSON object that includes the following keys: title, description, and requirements.",
			},
			{
				role: "user",
				content: `My interests are ${req.body.interests} and the skills I want to employ are ${req.body.skills}`,
			},
		],
		temperature: 0.8,
		max_tokens: 256,
	});
	res.status(200).send(response.choices[0].message);
});

export default router;
