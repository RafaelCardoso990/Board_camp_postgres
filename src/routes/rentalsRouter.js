import { Router } from "express";

import {postRental, getRental, putRental, deleteRental } from "../controllers/rentalsControllers.js"
import { validateDeleteRental, validatePostRental, validatePutRental } from "../middlewares/authRentals.js";

const rentalsRouter = Router();

rentalsRouter.post("/rentals",validatePostRental, postRental )
rentalsRouter.get("/rentals", getRental)
rentalsRouter.put("/rentals/:id/return",validatePutRental, putRental )
rentalsRouter.delete("/rentals/:id", validateDeleteRental, deleteRental)

export default rentalsRouter;