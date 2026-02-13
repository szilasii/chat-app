import mysql from "mysql2/promise"
import config from "../config/config"
import { IMulterFile, File } from "../file/file"

export interface IUser {
    userId?: number | null
    email: string
    name: string
    password: string
    avatar?: string
}

export class User implements IUser {
    userId?: number | null = null
    email: string = ""
    name: string = ""
    password: string = ""
    avatar?: string
    constructor(init?: Partial<User>) {
        if (init) {
            Object.assign(this, init as Partial<User>)
        }

    }

    getUserData() {
        const user: IUser = Object.assign(this as Partial<User>)
        user.password = ""
        return user
    }
    async loadDataFromDb(userId: number) {
        const connection = await mysql.createConnection(config.database)
        try {
            
            const [results]:any = await connection.query(
                "select userId, email, name, avatar from users where userId=?", [userId])
            Object.assign(this, results[0] as Partial<User>)

        } catch (err) {
            throw err
        }
        finally{
            connection.end
        }

    }
    static async updateAvatarWidthUserId(userId: number, avatar: IMulterFile) {
        const connection = await mysql.createConnection(config.database);

        try {
            if (avatar) {
                await connection.query(
                    "update users set avatar= ? where userId=?", [avatar.filename, userId])
            }
        } catch (err) {
            throw err
        }
    }
    async updateAvatar() {
        const connection = await mysql.createConnection(config.database);
        console.log(this.avatar)
        try {
            if (this.avatar) {
                await connection.query(
                    "update users set avatar= ? where userId=?", [this.avatar, this.userId])
            }
        } catch (err) {
            throw err
        }
        finally {
            connection.end()
        }

    }

    async saveToDatabase(avatar: IMulterFile | null) {
        const connection = await mysql.createConnection(config.database);
        const file = new File()
        try {
            const [results]: any = await connection.query(
                "insert into users (email, name, password) values (?,?,?)", [this.email, this.name, this.password])
            if (results.insertId === 0) {
                if (avatar) {
                    file.setData(avatar, results.insertId)
                    file.deleteFileDir()
                }
                throw "Hiba a Files táblába történő mentéskor!"
            }

            if (avatar) {
                file.setData(avatar, results.insertId)
                await file.saveToDatabase()
                this.avatar = avatar.filename
                this.updateAvatar()

            }
            this.userId = results.insertId
        } catch (err) {
            this.avatar = ""
            throw err
        }
        finally {
            connection.end()
        }
    }
}

