import { Router } from "express";

import { getCustomers, getCustomersById, postCustomers, updateCustomers } from "../controllers/customersControllers.js";
import { validateCustomer, validatePost, validatePut } from "../middlewares/authCustomers.js";

const customersRouter = Router();

customersRouter.post("/customers",validateCustomer, validatePost, postCustomers )
customersRouter.get("/customers", getCustomers)
customersRouter.get("/customers/:id", getCustomersById)
customersRouter.put("/customers/:id",validateCustomer, validatePut, updateCustomers )


export default customersRouter;