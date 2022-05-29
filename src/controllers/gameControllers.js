import db from "../db.js";

export async function getGames(req,res){
    
    try{
       const result = await db.query(`SELECT games.*, categories.name as "categoryName"
        FROM games 
        JOIN categories 
        ON games."categoryId" = categories.id;`)
        res.status(200).send(result.rows)
    }  catch(err){

        console.log(err);
        res.status(500).send(err);

    }
}

export async function postGame(req,res){

    try{

        await db.query( `INSERT INTO games 
        (name, image, "stockTotal", "categoryId", "pricePerDay") 
        VALUES ($1, $2, $3, $4, $5)`, 
        [req.body.name, req.body.image, req.body.stockTotal, req.body.categoryId, req.body.pricePerDay])
        res.status(201).send("ok");

    } catch(err){

        console.log(err);
        res.status(500).send(err);

    }
}