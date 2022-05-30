import { Router } from "express";
import { getCategories, postCategories } from "../controllers/categoriesControllers.js";
import validateName from "../middlewares/authName.js";

const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategories)
categoriesRouter.post("/categories", validateName, postCategories)

export default categoriesRouter;