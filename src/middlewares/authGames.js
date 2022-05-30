
import db from "../db.js";
import Joi from "joi";

const gameSchema = Joi.object(
    {
        name: Joi.string().required(),
        image: Joi.string().required(),
        stockTotal: Joi.number().integer().min(1).required(),
        categoryId: Joi.number().integer().required(),
        pricePerDay: Joi.number().integer().min(1).required()
    }
)
export async function validateGames(req, res, next) {
    const {name, image, stockTotal, categoryId, pricePerDay} = req.body;
    try{
        const result = gameSchema.validate({name, image, stockTotal, categoryId, pricePerDay});
        if(result.error){
            return res.sendStatus(400);
        }
        const nameExists = await db.query(`
            SELECT *
            FROM games
            WHERE name = $1
        `, [name]);
        if(nameExists.rowCount > 0){
            return res.sendStatus(409);
        }
        const categoryExists = await db.query(`
            SELECT *
            FROM categories
            WHERE id = $1
            `, [categoryId]);
        if(categoryExists.rowCount === 0){
            return res.sendStatus(400);
        }
        next();


    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}