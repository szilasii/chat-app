import { User } from "../../user/user"

export const getUserDataSocket = (userId: number)  => {
    const user = new User()
    user.loadDataFromDb(userId)
    return user.getUserData()
}

export const getUserMessage = (userId: number, roomId: number) => {

}

