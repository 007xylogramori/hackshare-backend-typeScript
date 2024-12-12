// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./src/db/index";
import {app} from './src/app'
import { config } from "./src/utils/config";
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
