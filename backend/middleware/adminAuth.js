
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config() 

const adminAuth = async (req,res,next) => {
    try {
        let {token} = req.cookies 

        if(!token) {
            return res.ststus(400).json({
                message:'Not Authorized Login Again'
            })
        }
        let verifyToken = jwt.verify(token , process.env.JWT_SECRET)

        if(!verifyToken) {
            return res.ststus(400).json({
                message:'Not Authorized Login Again , invlaid token'
            }) 
        }
        req.adminEmail = process.env.ADMIN_EMAIL
        next()

    } catch(error) {
            console.log("adminAuth error")
            return res.status(500).json({
                message:`adminAuth error ${error}`
            })
    }
}


export default adminAuth