const express= require('express')
const router=express.Router();
const posts= require('../models/post');
const multer = require('multer');

router.use(express.static('public'));
router.use('/Image', express.static(__dirname + '/Image'));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/Image/'); 
    },
    filename: (req, file, cb) => {
      const fileName = `${file.originalname}`;
      cb(null, fileName);
    },
  });
  
  const upload = multer({ storage: storage });


  router.post('/posts', upload.single('image'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
  
    let url="http://localhost:2000/Image/"+req.file.originalname;
    var obj={
        
             "title":req.body.title,
              "comments":req.body.comments,
              "image":url
            }
    const result = new posts(obj);
    try {
      await result.save();
      res.status(200).json({ success: true });
    }
    catch(err){
     res.status(400).json("Internal server error",err)
    }
   
  });

  router.get('/posts', async (req, res) => {
    try {
        const response = await posts.find({}, { title: 1, comments: 1, image: 1 });
        res.status(200).json({ data: response });
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err });
    }
});

router.delete('/posts/:title', async (req, res) => {
  const title = req.params.title;
  try {
      const response = await posts.findOneAndDelete({ title: title });
      res.status(201).json({ msg: "post deleted successfully" });
  } catch (err) {
      console.log("Internal server error", err);
      res.status(500).json({ error: "Internal server error", details: err });
  }
});



module.exports=router;