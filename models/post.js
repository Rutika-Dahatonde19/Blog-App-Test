const mongoose=require('mongoose');

const postSchema= new mongoose.Schema({

    title:{
        type:String,
        require:true,
    },
    comments:{
      type:String
    },
    image:{
        type:String,
        require:true
    }
})

const posts=mongoose.model("posts",postSchema,"posts");
module.exports=posts;