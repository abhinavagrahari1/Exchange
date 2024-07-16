import {WebSocket} from 'ws';
import { OutgoingMessage } from './types/out';
import { IncomingMessage, SUBSCRIBE, UNSUBSCRIBE } from './types/in';
import { SubscriptionManager } from './SubscriptionManager';

export class User{
    private id: string;
    private ws: WebSocket;

    constructor(id: string, ws: WebSocket){
        this.id =id;
        this.ws = ws;
    }

    private subsriptions: string[] = [];

    public subscribe(subscription:string){
        this.subsriptions.push(subscription);
    }

    public unsubscribe(subscription: string){
        this.subsriptions = this.subsriptions.filter(s=>s!==subscription);
    }

    emit(message: OutgoingMessage){
        this.ws.on("message", (message: string)=>{
            const parsedMessage : IncomingMessage = JSON.parse(message);
            if(parsedMessage.method === SUBSCRIBE){
                parsedMessage.params.forEach(s=>SubscriptionManager.getInstance().subscribe(this.id, s));
            }

            if(parsedMessage.method === UNSUBSCRIBE){
                parsedMessage.params.forEach(s=>SubscriptionManager.getInstance().unsubscribe(this.id, parsedMessage.params[0]));
            }
        })
    }
}
