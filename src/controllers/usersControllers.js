import { db } from "../database/databaseConnection.js";
import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid';

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

export async function signin(req, res) {
    const {email, password } = req.body;
    try {
       const user = await db.query(`
            SELECT * FROM users WHERE email = $1
       `, [email]);

       if(user.rowCount === 0) return res.status(401).send('email não cadastrado');
       const isAuthorized = bcrypt.compareSync(password, user.rows[0].password);
       if(!isAuthorized) return res.status(401).send('senha incorreta');

       const token = uuid();
       await db.query(`
            INSERT INTO sessions ("userId", token ) VALUES ( $1, $2 );
       `,[user.rows[0].id, token]);
       res.send({token});
    } catch (error) {
        res.status(500).send(error.message);
    }

}