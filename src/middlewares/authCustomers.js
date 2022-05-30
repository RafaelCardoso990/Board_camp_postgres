import db from "../db.js";
import Joi from "joi";

const customerSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().length(11).required(),
    cpf: Joi.string().length(11).required(),
    birthday: Joi.date().required()
})

export async function validateCustomer(req, res, next) {
    const data = req.body;
    const validation = customerSchema.validate(data);
    if(validation.error){
        return res.sendStatus(400);
    }
    next();
}

export async function validatePost(req, res, next){
    const data = req.body;
    const cpfExists = await db.query(`
            SELECT * FROM customers WHERE cpf = $1`, [data.cpf]
    );
    if(cpfExists.rows.length > 0){
        return res.sendStatus(409);
    }

    next();
}

export async function validatePut(req, res, next){
    const {id} = req.params;
    const idExists = db.query(`
        SELECT * FROM customers WHERE id = $1`, [id]
    );
    
    if(!idExists){
        return res.sendStatus(404);
    }
    next();
}