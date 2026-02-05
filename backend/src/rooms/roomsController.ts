import config from "../config/config"
import mysql from "mysql2/promise"
import { Room } from "./room"
export const addChatRooms = async (req:any, res:any) => {
    const userId = req.user.userId
    const roomName = req.body.name

    if (!roomName) {
           return res.status(404).send({ error: "Nem megfelelően megadott adatok!" })

    }
    const room = new Room({"roomId": null,"name": roomName, "owner":userId })
    try {
        room.saveToDatabase()
        return res.status(200).send({ room: room })
    }
    catch (err) {
        res.status(500).send({error: err})
    }

}
export const deleteChatRooms = (req:any, res:any) => {

}
export const getUserChatRooms = async (req: any, res: any) => {
    const userId = req.user.userId
 
    const connection = await mysql.createConnection(config.database);
    try {
        const [rows]: any = await connection.query(
            "select chatrooms.roomId, name from members join chatrooms on chatrooms.`roomId` = members.`roomId` where members.userId = ?", [userId])
       
            if (rows) {
             return res.status(200).send({ rooms: rows })
        }
        res.status(404).send({error: "Nincs szoba"})   
    } catch (err) {
         res.status(500).send({error: err})
         connection.end()
    }
    finally {
        connection.end()
    }
}
