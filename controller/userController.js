const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const generateToken = require("../utils/generateToken")
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
        res.status(409)
        throw new Error("User already registered")
    }

    const hashPassword = bcrypt.hashSync(password, 10)
    arr.push({ name, phone, email, password: hashPassword })

    const accesstoken = generateToken(name, phone, email)

    res.status(201).json({ accesstoken, message: "Successfully Registered" })
}

const login = (req, res) => {
    const { email, password } = req.body
    const user = arr.find(item => item.email === email)
    //if user not exist
    if (!user) {
        res.status(404)
        throw new Error("User not Registered!")
    }
    const checkPassword = bcrypt.compareSync(password, user.password)
    if (!checkPassword) {
        res.status(401)
        throw new Error("Invalid Password")
    }
    //generate token
    const accesstoken = generateToken(user.name, user.phone, user.email)
    res.status(200).json({ accesstoken, message: "Successfully Logged in" })
}

const dashboard = (req, res) => {
    res.send({ articles: "random articles", username: req.user.name })
}

const profile = (req, res) => {
    res.send(req.user)
}


module.exports = { register, login, dashboard, profile }