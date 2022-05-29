import db from "../db.js";

export async function getCategories(req,res){
    try{
        const categories = await db.query(
            'SELECT * FROM categories');            
        res.status(200).send(categories.rows);
    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }
    
}

export async function postCategories(req, res){
    const {name} = req.body
    try{
        await db.query('INSERT INTO categories (name) VALUES ($1);', [name])    
        res.status(201).send("ok");
    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}