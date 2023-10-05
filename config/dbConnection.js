import mongoose from "mongoose";

const connectionToDB = async () =>{
    try{
        const {connection} = await mongoose.connect(process.env.DATABASE_URl);
        if(connection){
            console.log(`Connected to MongoDB: ${connection.host}`)
        }
    }catch(e){
        console.log(e);
        console.log(e.message);
        process.exit(1);
    }
}

export default connectionToDB;