import express from 'express'
const router = express.Router()
import authRouter from "../routes/auth.js"
import loanRouter from "../routes/loan.js"

router.get("/" , (req,res)=> res.status(200).json({
    error : false , 
    message : "Welcome to the API"
}))
router.use("/auth" , authRouter )
router.use("/loan" , loanRouter )

export default router

