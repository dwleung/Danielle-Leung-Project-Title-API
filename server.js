import express from "express";
import dotenv from "dotenv";
import openaiRoutes from "./routes/openai_routes.js";
import userRoutes from "./routes/user_routes.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

//Home
app.get("/", (req, res) => {
	res.send("Welcome!");
});

//OpenAI route
app.use("/openai", openaiRoutes);

//User route
app.use("/user", userRoutes);

app.listen(PORT, () => {
	console.log(`Server running on PORT: ${PORT}`);
});
