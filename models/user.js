const mongoose=require('mongoose');

const signUpSchema= new mongoose.Schema({

    username:{
        type: String,
        required: true,
        unique:true,
        min:3,
        max:20
    },
    email:{
       type: String,
        required: true,
        unique:true

    },
    password:{
       type: String,
       required: true,
       min:3,
       max:10
    },

},

{timestamps: true}

);


const signUp=mongoose.model("signUp",signUpSchema,"signUp");
module.exports=signUp;