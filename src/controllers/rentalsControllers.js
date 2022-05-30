import db from "../db.js"
import dayjs from "dayjs"


export async function postRental(req,res){
    const {customerId, gameId, daysRented} = req.body  
    const rentDate = dayjs().format("YYYY-MM-DD").toString()
    const returnDate = null
    const delayFee = null
    
    try{

        const price = await db.query(`SELECT games."pricePerDay" from games WHERE id= $1;
        `,[gameId])
        
        const originalPrice = price.rows.map(item => {
            const {pricePerDay} = item
            return pricePerDay * daysRented
        })      

        await db.query(`INSERT INTO rentals
        ("customerId", "gameId", "daysRented", "rentDate", "returnDate", "originalPrice", "delayFee")
        VALUES ($1,$2,$3,$4,$5,$6,$7 *(
            SELECT games."pricePerDay" AS "originalPrice" FROM games WHERE games.id = $2
        ))`,[customerId, gameId, daysRented, rentDate, returnDate, originalPrice[0], delayFee])

        res.sendStatus(201)
    } catch(err){

        console.log(err);
        res.status(500).send(err);

    }
}


export async function getRental(req, res) {
    try {
		const { customerId, gameId } = req.query;

		const rentals = await db.query(`
			SELECT  rentals.*,
					customers.id AS customer_id,
					customers.name AS customer_name,
					games.id AS game_id,
					games.name AS game_name,
					categories.id AS category_id,
					categories.name AS category_name FROM rentals 
			JOIN customers ON rentals."customerId" = customers.id 
			JOIN games ON rentals."gameId" = games.id 
			JOIN categories ON games."categoryId" = categories.id
			;`);

		let rentalsArray = rentals.rows;

		if (customerId) {
			rentalsArray = rentalsArray.filter((obj) => obj.customerId === Number(customerId));
		}
		if (gameId) {
			rentalsArray = rentalsArray.filter((obj) => obj.gameId === Number(gameId));
		}

		const result = rentalsArray.map((obj) => ({
			id: obj.id,
			customerId: obj.customerId,
			gameId: obj.gameId,
			rentDate: obj.rentDate,
			daysRented: obj.daysRented,
			returnDate: obj.returnDate,
			originalPrice: obj.originalPrice,
			delayFee: obj.delayFee,
			customer: {
				id: obj.customer_id,
				name: obj.customer_name,
			},
			game: {
				id: obj.game_id,
				name: obj.game_name,
				categoryId: obj.category_id,
				categoryName: obj.category_name,
			},
		}));        
		return res.send(result);
	} catch (err) {
		console.log(err);
		return res.sendStatus(500);
	}
}

export async function putRental(req, res){
    const {id} = req.params;
    const data = req.body;
    const date = new Date(); 
    let time = new Date(data.rentDate); 
    try{
        const rightDay = time.setDate(time.getDate() + data.daysRented); 
        let delayFee = 0;
        if(date > rightDay){
            const totalDays = Math.ceil((date-rightDay) / (1000 * 3600 * 24)) 
            delayFee = totalDays * (data.originalPrice/data.daysRented);
        }
        const devolution = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        await db.query(`
            UPDATE rentals
            SET "customerId" = $1, "gameId" = $2, "daysRented" = $3, "rentDate" = $4, "originalPrice" = $5, "returnDate" = $6, "delayFee" = $7
            WHERE id = $8
        `, [data.customerId, data.gameId, data.daysRented, data.rentDate, data.originalPrice, devolution, delayFee, id]);
        res.send('OK')
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}

export async function deleteRental(req, res){
    const {id} = req.params;
    try{
        await db.query(`
            DELETE FROM rentals
            WHERE id = $1
        `, [id]);
        res.sendStatus(200);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
}