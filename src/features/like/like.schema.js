import mongoose from "mongoose";

export const likeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'on_model' //defining ref path
    },
    on_model:{ // ref path
        type:String,// name of collection basically
        enum:['Product','Category']
    }
}).pre('save',(next)=> {
    console.log("new like coming in");
    next()
}).post('save',async (doc)=>{
    try {
        console.log("new like saved");

        // Populate likeable field
        await doc.populate({
            path: 'likeable',
            model: doc.on_model // dynamically use on_model field
        })

        // Populate nested categories
        const res= await doc.populate({
            path: 'likeable.categories',
            model: 'Category'
        })
        console.log(res);
    } catch (error) {
        console.error("Error populating document in post save hook:", error);
    }
    
}).pre('find',(next)=>{
    console.log("retrieving likes");
    next()

}).post('find',(docs)=>{
    console.log(docs,"findcompleted");
})