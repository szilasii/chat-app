import { WebSocketServer } from "ws"
import jwt from "jsonwebtoken";
import { config } from "../config/config"
import { User } from "../user/user" 
import { Message, Messages } from "../messages/message";

const wss = new WebSocketServer({ port: 8081 })
const clients = new Set()
wss.on("connection", async (ws, req) => {

    if (!req.url) {
        ws.close(4001, "Nem, adott meg tokent!");
        return;
    }
    const params = new URLSearchParams(req.url.replace("/", ""));
    const token = params.get("token");

    if (!token) {
        ws.close(4001, "Token hiányzik");
        return;
    }

    try {
        const tUser:any = jwt.verify(token, config.jwtSecret);
        const user: User = new User()
        await user.loadDataFromDb(tUser.userId)
        clients.add({userId: user.userId, socket: ws}) // bármikor elérhető!
        ws.send(JSON.stringify({ type: "auth_ok", user: user }));
    } catch (err) {
        ws.close(4002, "Érvénytelen token");
    }

    ws.on("message", async (msg:any) => {
        console.log(msg)
        switch (msg.type) {
            case "getMessage": 
                const messages = new Messages(await Messages.loadDataFromDb(msg.roomid))
                ws.send(JSON.stringify({ type: "messages", messages: messages }));
            
            case "message": 
                const message = new Message()
            default : ""
        }

        console.log("Üzenet:", msg.toString());
    });
})
