import mongoose from "mongoose";

export const Connection = async() => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(process.env.DATABASE_URL, {useUnifiedTopology: true});
        console.log("Db connect!");
    } catch (error) {
        console.log(error);
    }
}