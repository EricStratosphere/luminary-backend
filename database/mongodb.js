import mongoose from "mongoose";

import { MONGODB_URI } from "../config/env.js";

const connectToDatabase = async () => {
    console.log(MONGODB_URI);
    try{
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to database!');
    }
    catch(error){
        console.log('Error connecting to database: ', error);
    }
}

export default connectToDatabase;