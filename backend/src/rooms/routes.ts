import { Router } from "express"
import { getUserChatRooms, deleteChatRooms, addChatRooms } from "./roomsController"
import verifyToken from "../middleware/auth"

const router: Router = Router()
router.delete('/rooms/id',verifyToken,deleteChatRooms)
router.post('/rooms',verifyToken, addChatRooms)    
router.get('/rooms',verifyToken,getUserChatRooms)

export default router