import { Router } from "express";
import { getCustomers, getCustomersById, postCustomers, updateCustomers } from "../controllers/customersControllers.js";


const customersRouter = Router();

customersRouter.post("/customers", postCustomers )
customersRouter.get("/customers", getCustomers)
customersRouter.get("/customers/:id", getCustomersById)
customersRouter.put("/customers/:id", updateCustomers )


export default customersRouter;