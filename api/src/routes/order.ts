import {Router} from "express";
import { RedisManager } from "../RedisManager";
import { CREATE_ORDER, CANCEL_ORDER, ON_RAMP,GET_OPEN_ORDERS } from "../types";

export const orderRouter = Router();

orderRouter.post("/", async(req,res)=>{
    const {market, price, quantity, side, userId} = req.body;
    
    const response = await RedisManager.getInstance().sendAndAwait({
        //@ts-ignore
        type: typeof CREATE_ORDER,
        data: {
            market,
            price,
            quantity,
            side,
            userId
        }
    });

    //@ts-ignore
    res.json(response.payload);
})

orderRouter.delete("/", async(req,res)=>{
    const {orderId, market}= req.body;
    const response = await RedisManager.getInstance().sendAndAwait({
        type: CANCEL_ORDER,
        data:{
            orderId,
            market
        }
    });

    //@ts-ignore
    res.json(response.payload);
})

orderRouter.get("/open", async(req, res)=>{
    const response = await RedisManager.getInstance().sendAndAwait({
        type: GET_OPEN_ORDERS,
        data: {
            userId: req.query.userId as string,
            market: req.query.market as string
        }
    });

    //@ts-ignore
    res.json(response.payload);
})