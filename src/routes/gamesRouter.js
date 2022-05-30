import { Router } from "express";
import { getGames, postGame } from "../controllers/gameControllers.js";
import { validateGames } from "../middlewares/authGames.js";

const gameRouter = Router();

gameRouter.post("/games",validateGames, postGame )
gameRouter.get("/games", getGames)

export default gameRouter;