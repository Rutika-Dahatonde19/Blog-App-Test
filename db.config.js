const  mongoose  = require("mongoose")

db={};
db.mongoose=mongoose;
db.url='mongodb://localhost:27017/Nodedb';

db.mongoose.connect(db.url)
.then(()=>{
    console.log("database connect successfully...");
})
.catch(()=>{
  console.log("database not connected..")
});
