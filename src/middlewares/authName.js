import db from "../db.js";

export default async function validateName(req, res, next) {
    const {name} = req.body;
    if(!name){
        return res.sendStatus(400);
    }

    const nameExists = await db.query(`SELECT * FROM categories WHERE name = $1`, [name]);
    if(nameExists.rows.length > 0){
        return res.sendStatus(409);
    }

    next();
}