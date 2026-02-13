import mysql from "mysql2/promise"
import config from "../config/config"
import { IMulterFile, File } from "../file/file"
interface IMessage {
    messageId?: number
    message?: string
    messageType?: number | null
    fileId?: string | null
    sender?: number
    roomId?: number
}
export class Message implements IMessage {
    messageId?: number
    message?: string
    messageType?: number | null
    fileId?: string | null
    sender?: number
    roomId?: number

    constructor(init: Partial<Message>) {
        if (init) {
            Object.assign(this, init as Partial<Message>)
        }
    }

    getData() {
            const message: IMessage = Object.assign(this as Partial<Message>)
            return message
        }

    async loadDataFromDb(messageId: number) {
        try {
            const connection = await mysql.createConnection(config.database)
            const [results]:any = await connection.query(
                "select * from messages where messageId=?", [messageId])
            Object.assign(this, results[0] as Partial<Message>)

        } catch (err) {
            throw err
        }

    }

    async updateMessageFile() {
            const connection = await mysql.createConnection(config.database);
            
            try {
                if (this.messageId) {
                    await connection.query(
                        "update message set fileId= ?", [this.fileId])
                }
            } catch (err) {
                throw err
            }
    
        }


    async saveToDatabase(message: IMessage, messageFile: IMulterFile | null) {
        const connection = await mysql.createConnection(config.database);
        const file = new File()

        try {
            const [results]: any = await connection.query(
                "insert into messages (message,messageType,fileId,sender,roomId) values (?,?,?,?,?)", [this.message, this.messageType,null,this.sender,this.roomId])
            if (results.insertId === 0) {
                if (messageFile) {
                    file.setData(messageFile, results.insertId)
                    file.deleteFileDir()
                }
                throw "Hiba a message táblába történő mentéskor!"
            }

            if (messageFile) {
                file.setData(messageFile, results.insertId)
                await file.saveToDatabase()
                this.fileId = messageFile.filename
                this.updateMessageFile()

            }
            
        } catch (err) {
            this.fileId = null
            throw err
        }
    }        

}