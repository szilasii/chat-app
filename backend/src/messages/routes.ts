import { Router } from "express"
import { getUserMessagesRoom,getUserChatRooms,deleteMessageFromId, deleteChatRooms, addChatRooms } from "../messages/messageController"
import verifyToken from "../middleware/auth"

const router: Router = Router()
router.get('/messages',verifyToken,getUserMessagesRoom)
router.get('/chatrooms',verifyToken,getUserChatRooms)
router.delete('/messages/:id',verifyToken,deleteMessageFromId)
router.delete('/chatrooms/id',verifyToken,deleteChatRooms)
router.post('/chatrooms',verifyToken, addChatRooms)    

export default router