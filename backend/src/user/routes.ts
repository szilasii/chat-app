import { Router } from "express"
import { signIn, signUp,changeAvatar, getAllUser } from "../user/userController"
import verifyToken from "../middleware/auth"

const router: Router = Router()
router.post('/user/signin',signIn)
router.post('/user/signup',signUp)
router.put('/user/avatar',verifyToken,changeAvatar)
router.get('/user',verifyToken,getAllUser)
export default router