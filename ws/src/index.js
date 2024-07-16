import {WebSocketServer} from 'ws';
import {UserManager} from './UserManager';

const wss = WebSocketServer({port: 3001});

wss.on("connection", (ws)=>{
    UserManager.getInstance().addUser(ws);
})