import express from "express";
import cors from 'cors';
import  indexRoute  from "./routes/indexRoutes.js";

const app = express();
app.use(express());
app.use(express.json());
app.use(cors());
app.use(indexRoute);

const port = process.env.PORT || 5000;
app.listen(port, ()=>{console.log(`RUNNING IN PORT ${port}`)});
