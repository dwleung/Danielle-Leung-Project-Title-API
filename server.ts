const express = require("express");
const app = express();
const cors = require("cors");
const openaiRoutes = require("./routes/openai_routes");
require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("Welcome!");
});

app.use("/openai", openaiRoutes);

app.listen(PORT, () => {
	console.log(`Server running on PORT: ${PORT}`);
});
