import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import openaiRoutes from "./routes/openai_routes";
import userRoutes from "./routes/user_routes";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

//Home
app.get("/", (req: Request, res: Response) => {
	res.send("Welcome!");
});

//OpenAI route
app.use("/openai", openaiRoutes);

//User route
app.use("/user", userRoutes);

app.listen(PORT, () => {
	console.log(`[server]: Server running on PORT: ${PORT}`);
});
