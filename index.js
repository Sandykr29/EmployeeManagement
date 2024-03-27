const express=require("express");
const { Connection } = require("./db");
const { userRouter } = require("./route/user.route");
const {dashRouter} =require("./route/dashboard.route")
const {auth}=require("./middleware/auth.middleware")


const app=express();

app.use(express.json());
app.use("/",userRouter);
app.use("/",auth,dashRouter)


app.listen(8000,async()=>{
    try {
        await Connection;
        console.log("Connected to DB")
        console.log("Server is running at port 8000")
    } catch (error) {
        console.log("error due to",error.message)
    }
})