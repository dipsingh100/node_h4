const jwt = require("jsonwebtoken")

const generateToken = (name, phone, email) => {
    return jwt.sign({
        user: {
            name,
            phone,
            email
        }
    }, process.env.SECRET_KEY,
        { expiresIn: "15m" }
    )
}

module.exports = generateToken