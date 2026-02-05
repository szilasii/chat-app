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

    async saveToDatabase(members?: number[]) {


        const connection = await mysql.createConnection(config.database);

        try {
            const [results]: any = await connection.query(
                "insert into chatRooms values (?.?,?)", [this.name, this.owner])
            if (results.insertId === 0) {
                throw "Hiba a ChatRooms táblába történő mentéskor!"
            }

            if (members && members.length > 0) {
                await Promise.all(
                    members.map(async (member: number ) => {
                        const [results]: any = await connection.query(
                            "INSERT INTO member (roomId, userId) VALUES (?, ?)",
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


