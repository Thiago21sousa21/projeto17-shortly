import { db } from "../database/databaseConnection.js";
import bcrypt from 'bcrypt';

export async function signup(req, res) {
    const { name, email, password } = req.body;
    try {
        const criptPassword = bcrypt.hashSync(password, 10);
        await db.query(`
            INSERT INTO users (name, email, password) VALUES ($1, $2, $3);
            `, [name, email, criptPassword]);        
        res.sendStatus(201);
    } catch (error) {
        if(error.code === '23505' && error.constraint === "users_email_key")return res.status(409).send(error.message);
        res.status(500).send(error);
    }

}