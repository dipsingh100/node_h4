const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const arr = []
require("dotenv").config()

const register = (req, res) => {
    const { name, phone, email, password } = req.body
    if (!name || !phone || !email || !password) {
        res.status(400)
        throw new Error("All fields are required")
    }
    const user = arr.find(item => item.email === email)
    //if user exist
    if (user) {
        res.status(400)
        throw new Error("User already registered")
    }

    const hashPassword = bcrypt.hashSync(password, 10)
    arr.push({ name, phone, email, password: hashPassword })
    res.status(201).json({ name, email })
}

const login = (req, res) => {
    const { email, password } = req.body
    const user = arr.find(item => item.email === email)
    //if user not exist
    if (!user) {
        res.status(400)
        throw new Error("User not found!")
    }
    const checkPassword = bcrypt.compareSync(password, user.password)
    if (!checkPassword) {
        res.status(400)
        throw new Error("Wrong Password")
    }
    //generate token
    const accesstoken = jwt.sign({
        user: {
            name: user.name,
            phone: user.phone,
            email: user.email
        }
    }, process.env.SECRET_KEY, { expiresIn: "5m" })
    res.status(200).json({ accesstoken, message: "Successfully Logged in" })
}


module.exports = { register, login }