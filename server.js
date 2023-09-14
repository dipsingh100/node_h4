const express = require("express")
const userRoute = require("./routes/userRoutes")
const errHandler = require("./middleware/errHandler")
const validateToken = require("./middleware/TokenHandler")
const cors = require("cors")
const { dashboard, profile } = require("./controller/userController")
require("dotenv").config()

const app = express()
app.use(express.json())

app.use(cors({
    origin: "*"
}))

app.use("/user", userRoute)
app.get("/dashboard", validateToken, dashboard)
app.get("/profile", validateToken, profile)

app.use(errHandler)

const { PORT } = process.env
app.listen(PORT, () => {
    console.log(`server is live on http://localhost:${PORT}`);
})