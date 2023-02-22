import mongoose from "mongoose";

async function MongoDB(){
    mongoose.set('strictQuery', false);
    mongoose.connect('mongodb+srv://jr-study:veShK8iib15UMWhZ@cluster0.apdwqj8.mongodb.net/?retryWrites=true&w=majority', (err) => {
        if(err) console.log(err)
        else console.log("mongo is connected");
    });
}

export default MongoDB;