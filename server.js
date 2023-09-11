const express = require("express")
const userRoute = require("./routes/userRoutes")
const errHandler = require("./middleware/errHandler")
const validateToken = require("./middleware/TokenHandler")
require("dotenv").config()

const app = express()
app.use(express.json())

app.use("/user", userRoute)
app.get("/getuser", validateToken, (req, res)=>{
    res.send(req.user)
})

app.use(errHandler)

const {PORT} = process.env
app.listen(PORT, () => {
    console.log(`server is live on http://localhost:${PORT}`);
})