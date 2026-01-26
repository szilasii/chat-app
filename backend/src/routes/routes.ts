import { Router } from "express"


const router: Router = Router()
router.get('/',(_req,res)=>{res.send("fut a chat Api Server")})

export default router