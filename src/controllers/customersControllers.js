import db from "../db.js";

export async function postCustomers(req,res){
    const {name, phone, cpf, birthday} = req.body

    try{
        await db.query(`INSERT INTO customers 
        ("name", "phone", cpf, birthday) 
        VALUES ($1,$2,$3,$4)`, [name, phone, cpf, birthday])
        res.sendStatus(201)
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }    
}

export async function getCustomers(req,res){
    try{
        const result = await db.query(`SELECT * FROM customers;`)
        res.status(200).send(result.rows)
    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}

export async function getCustomersById(req,res){
    const {id} = req.params
    try{
        const result = await db.query(`SELECT * FROM customers WHERE id = $1;`,[id])
        if(result.rowCount === 0){
            return res.sendStatus(404)
        }
        res.status(200).send(result.rows)
    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}


export async function updateCustomers(req,res){
    const {id} = req.params
    const {name, phone, cpf, birthday} = req.body
    try{
        await db.query(`UPDATE customers
        SET name = $1, phone = $2, cpf = $3, birthday = $4
        WHERE id = $5
        `, [name, phone, cpf, birthday, id])
        res.sendStatus(200)
    }catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}