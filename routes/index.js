import express from 'express'
const router = express.Router()
import authRouter from "../routes/auth.js"
import beneficiaryRouter from "../routes/beneficiary.js"
import tokenRouter from "../routes/token.js"

router.get("/" , (req,res)=> res.status(200).json({
    error : false , 
    message : "Welcome to the API"
}))
router.use("/auth" , authRouter )
router.use("/beneficiary" , beneficiaryRouter )
router.use("/token" , tokenRouter )

export default router

