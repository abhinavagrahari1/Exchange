import express from 'express';
import cors from 'cors';
import { createClient } from "redis";

import { orderRouter } from './routes/order';
import { depthRouter } from './routes/depth';
import { tickerRouter } from './routes/ticker';
import { tradesRouter } from './routes/trades';

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/order", orderRouter);
app.use("/api/v1/depth", depthRouter);
app.use("/api/v1/trades", tradesRouter);
app.use("api/v1/tickers", tickerRouter);







app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
})


