// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index";
import {app} from './app'
import { config } from "./utils/config";
dotenv.config({
    path: './.env'
})
    
connectDB()
.then(() => {
    app.listen(config.port || 8000, () => {
        console.log(`⚙️ Server is running at port : ${config.port}`);
    })
})
.catch((error) => {
    console.log("MONGO db connection failed !!! ", error);
})
