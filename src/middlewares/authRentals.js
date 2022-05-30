import db from "../db.js";
import Joi from "joi";

const rentSchema = Joi.object({
    customerId: Joi.number().required(),
    gameId: Joi.number().required(),
    daysRented: Joi.number().min(0).required(),
})

export async function validatePostRental(req, res, next) {
    const data = req.body;
    const validation = rentSchema.validate(data);
    try{
        if(validation.error){
            return res.sendStatus(400);
        }

        const testId = await db.query(`SELECT * FROM customers WHERE id = $1`, [data.customerId]);
        if(!testId.rows[0]){
            return res.sendStatus(400);
        }

        const testGame = await db.query(`SELECT * FROM games WHERE id = $1`, [data.gameId]);
        if(!testGame.rows[0]){
            return res.sendStatus(400);
        }

        const testRental = await db.query(`
            SELECT * FROM rentals WHERE "gameId" = $1
        `, [data.gameId]);
        if(testRental.rows.length >= testGame.rows[0].stockTotal){
            return res.sendStatus(400);
        }
        next();
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function validatePutRental(req, res, next) {
    const data = req.body;
    const {id} = req.params;
    try{
        const testId = await db.query(`SELECT * FROM rentals WHERE id = $1`, [id]);

        if(!testId.rows[0]){
            return res.sendStatus(404);
        }

        if(testId.rows[0].returnDate){
            return res.sendStatus(400);
        }

        next();
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function validateDeleteRental(req, res, next){
    const {id} = req.params;
    try{
        const testRental = await db.query(`
            SELECT * FROM rentals WHERE id = $1
        `, [id]);
        if(!testRental.rows[0]){
            return res.sendStatus(404);
        }

        if(testRental.rows[0].returnDate){
            return res.sendStatus(400);
        }

        next();
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}