const express=require('express');
const bodyparser=require('body-parser');
const bodyParser = require('body-parser');
const app=express();
app.use(bodyparser.json());
app.use(bodyparser.raw());
app.use(bodyparser.urlencoded({extended:true}));

const cors=require('cors');
app.use(cors());
app.use(express.static('public'));
app.use('/Image', express.static(__dirname + '/Image'));



const connect =require('./db.config');
const user=require('./router/signup');
const posts=require('./router/posts')

app.use('/apis',user,posts);




app.listen(2000,function(){
    console.log("server is running on 2000");
}); 