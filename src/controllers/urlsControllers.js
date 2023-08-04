import { db } from "../database/databaseConnection.js";
import { nanoid } from "nanoid";


export async function shortenUrl(req, res) {
    const { url } = req.body;
    const shortUrl = nanoid(6);

    try {
        await db.query(`
            INSERT INTO urls (url, "shortUrl", "userId") VALUES ( $1, $2, $3)
        `, [url, shortUrl, res.locals.user.userId]);


        const response = await db.query(`
            SELECT * FROM urls WHERE "shortUrl" = $1 LIMIT 1; 
        `, [shortUrl]);
        res.status(201).send({ id: response.rows[0].id, shortUrl: response.rows[0].shortUrl });


    } catch (error) {
        res.status(500).send(error.message);
    }

}

export async function getUrlById(req, res) {
    const {id} = req.params;    
    try {
        const response = await db.query(`
            SELECT id, "shortUrl", url FROM urls WHERE id = $1 LIMIT 1; 
        `, [id]);
        if(response.rowCount === 0)return res.sendStatus(404);
        res.send(response.rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }

}

export async function redirectByShort(req, res) {
    const {shortUrl} = req.params;    
    try {
        const response = await db.query(`
            SELECT url, id , visitcount FROM urls WHERE "shortUrl" = $1 LIMIT 1; 
        `, [shortUrl]);
        if(response.rowCount === 0)return res.sendStatus(404);
        let {visitcount, id} = response.rows[0];
        visitcount++;

        await db.query(`
            UPDATE urls SET "visitcount" = $1 WHERE id = $2; 
        `, [visitcount, id]);
        res.redirect(response.rows[0].url);
    } catch (error) {
        res.status(500).send(error.message);
    }

}

export async function deleteUrl(req, res) {
    const {id} = req.params;    
    try {
        const response = await db.query(`
            SELECT "userId" FROM urls WHERE id = $1 LIMIT 1; 
        `, [id]);
        if(response.rowCount === 0)return res.status(404).send('link não endcontrado');
        if(response.rows[0].userId !== res.locals.user.userId)return res.status(401).send('Só pode deletar os links que você fez!');
        
        await db.query(`
            DELETE FROM urls WHERE id = $1;
        `, [id]);
        res.sendStatus(204);
    } catch (error) {
        res.status(500).send(error.message);
    }

}

export async function getRanking (req, res) {    
    try {
        const response = await db.query(`
            SELECT  users.id, users.name ,COUNT(urls.id) AS "linksCount", 
            SUM(urls.visitCount) As "visitCount" 
                FROM users
                JOIN urls ON users.id = urls."userId"
                GROUP BY users.id
                ORDER BY "visitCount"  DESC
                LIMIT 10;	
        `);     
        
        res.send(response.rows);
    } catch (error) {
        res.status(500).send(error.message);
    }

}
