import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import physiotherapistRouter from "./routes/physiotherapistRoute.js"
import adminRouter from "./routes/adminRoute.js"

// app config
const app = express()
const port = process.env.PORT || 4001
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/physiotherapist", physiotherapistRouter)

app.get("/", (req, res) => {
  res.send("API Working")
});

app.listen(port, () => console.log(`Server started on PORT:${port}`))