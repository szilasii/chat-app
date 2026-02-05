import { Router } from "express"
import { getUserMessagesRoom,deleteMessageFromId } from "../messages/messageController"
import verifyToken from "../middleware/auth"

const router: Router = Router()
router.get('/messages/:rooms',verifyToken,getUserMessagesRoom)
router.delete('/messages/:id',verifyToken,deleteMessageFromId)


export default router