import {Router} from "express";
import { RedisManager } from "../RedisManager";
import { CREATE_ORDER, CANCEL_ORDER, ON_RAMP,GET_OPEN_ORDERS, GET_BALANCE } from "../types";
import { getRandomClientId } from "../utils";

export const orderRouter = Router();

orderRouter.post("/", async(req,res)=>{
    const {market, price, quantity, side, userId} = req.body;
    console.log({ market, price, quantity, side, userId })
    const response = await RedisManager.getInstance().sendAndAwait({
        //@ts-ignore
        type: CREATE_ORDER,
        data: {
            market,
            price,
            quantity,
            side,
            userId
        }
    });
    console.log("response api",response);

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

orderRouter.post("/on_ramp", async(req,res)=>{
    const {userId, amount} =req.body;
    const response= await RedisManager.getInstance().sendAndAwait({
        type: ON_RAMP,
        data: {
            userId,
            amount,
            txnId: getRandomClientId()
        }
    })
    //@ts-ignore
    res.json(response.payload);
})

orderRouter.get("/user_balance", async(req, res)=>{
    const response = await RedisManager.getInstance().sendAndAwait({
        type: GET_BALANCE,
        data: {
            userId: req.query.userId as string
        }
    })

    res.json(response.payload);
})