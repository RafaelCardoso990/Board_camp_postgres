import { Router } from "express";
import { getGames, postGame } from "../controllers/gameControllers.js";

const gameRouter = Router();

gameRouter.post("/games", postGame )
gameRouter.get("/games", getGames)

export default gameRouter;