import express from 'express'
const router = express.Router()

router.get( "/" , (req,res)=>{
    res.status(200).json({
        error : false,
        message : "auth api called"
    })
})
router.get( "/register" , (req,res)=>{
    res.status(200).json({
        error : false,
        message : "register api called"
    })
})

export default router