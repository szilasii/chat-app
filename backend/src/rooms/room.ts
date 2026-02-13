import config from "../config/config"
import mysql from "mysql2/promise"
interface IRoom {
    roomId: number | null
    name: string
    owner: number
}

export class Room implements IRoom {
    roomId!: number | null
    name!: string
    owner!: number
    constructor(init: IRoom) {
        Object.assign(this, init as Partial<IRoom>)
    }
    getRoomData() {
        return {roomId: this.roomId,name: this.name, owner: this.owner}
    }
    async saveToDatabase(members?: number[]) {
        const connection = await mysql.createConnection(config.database);

        try {
            const [results]: any = await connection.query(
                "insert into chatrooms values (?,?,?)", [null,this.name, this.owner])
            if (results.insertId === 0) {
                throw "Hiba a ChatRooms táblába történő mentéskor!"
            }
            this.roomId = results.insertId
              console.log(members)
            if (members && members.length > 0) {
                members.push(this.owner)
                await Promise.all(
                    members.map(async (member: number ) => {
                        const [results]: any = await connection.query(
                            "INSERT INTO members (roomId, userId) VALUES (?, ?)",
                            [this.roomId, member]
                        );
                        return results;
                    })
                );
            }

        } catch (err) {
            throw err
        }
        finally {
            connection.end()
        }

    }
    public deleteRoomToDatabase = async (roomId: number) => {
        const connection = await mysql.createConnection(config.database);
        try {
            const [results]: any = await connection.query(
                "delete from chatrooms where roomId = ?", [roomId])
            if (results.insertId === 0) {
                throw "Hiba a ChatRooms táblába történő mentéskor!"
            }
        } catch (err) {
            throw err
        }
        finally {
            connection.end()
        }
    }

}


export const deleteRoomToDatabase = async (roomId: number) => {
    const connection = await mysql.createConnection(config.database);
    try {
        const [results]: any = await connection.query(
            "delete from chatrooms where roomId = ?", [roomId])
        if (results.insertId === 0) {
            throw "Hiba a ChatRooms táblába történő mentéskor!"
        }
    } catch (err) {
        throw err
    }
}


