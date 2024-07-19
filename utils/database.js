 import mongoose from "mongoose";

 let isConnected = false; // Track the connection

 export const connectToDB =  async () => {
    mongoose.set('strictQuery', true); // this simply sets the mongoose options to true (if not specified, a warning will be shown)

    if(isConnected) {
        console.log("MongoDB is already connected")
        return;
    }
    // Using MongoDB URI we are able to connect to the mongodb atlas cloud storage
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompts",
            useNewUrlParser: true,
            useUnifiedTopology: true,

        })

        isConnected=true
        console.log("MongoDB connected")
    }
    catch(error){
        console.log(error)
    }
 }