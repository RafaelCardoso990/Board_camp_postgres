import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import categoriesRouter from "./src/routes/categoriesRouter.js";
import gameRouter from "./src/routes/gamesRouter.js";
import customersRouter from "./src/routes/customersRouter.js"
import rentalsRouter from "./src/routes/rentalsRouter.js"
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(categoriesRouter)
app.use(gameRouter)
app.use(customersRouter)
app.use(rentalsRouter)

app.listen(process.env.PORT , () => {
    console.log(`Server started on port ${process.env.PORT}`);
});