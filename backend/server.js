import express from 'express';
import bodyParser from "body-parser";
const port = 8000;
const app = express();
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import connectDb from "./config/db.js";
import router from './router/productrouter.js';

app.use(
    cors({
      origin: "http://localhost:3000",
      methods: ["POST", "PUT", "GET", "PATCH", "HEAD", "DELETE"],
      credentials: true,
    })
  );


connectDb();

app.use(bodyParser.json());

app.use("/api/products", router);

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`)
});