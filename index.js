import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import userRoutes from "./routes/user.js"

const PORT=process.env.PORT || 3000
const app=express()


app.use(cors())
app.use(express.json())

app.use("/api/auth",userRoutes)


mongoose
    .connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Mongodb connected")
        app.listen(PORT,()=>console.log("Server is listening at port 3000 "))
    })
    .catch((err)=>console.error("Mongodb error : ",err))
