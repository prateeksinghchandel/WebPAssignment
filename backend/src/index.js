import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";
import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config({
    path: './.env'
});

const startserver = async () => {
    try{
        await connectDB();

        app.on("error",(error)=>{
            console.log("ERROR",error);
            throw error;
        }); 
        app.listen(process.env.PORT || 8000,()=>{
            console.log(`Server is running on port ${process.env.PORT}`);
        })
    }catch(error){
        console.log("MongoDB connection failed",error);
    }
}

startserver();
