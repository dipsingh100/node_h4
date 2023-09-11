const jwt = require("jsonwebtoken")
require("dotenv").config()

const validateToken = (req, res, next) => {
    let token
    const authHeader = req.headers.authorization 

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded)=>{
            if(err){
                res.status(401)
                throw new Error("Invalid token")
            }
            req.user = decoded.user
            next()
        })
    } else{
        req.status(400)
        throw new Error("Token not found")
    }
    
}

module.exports = validateToken