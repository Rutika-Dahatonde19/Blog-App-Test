const router = require('express').Router();
const cors=require('cors');
router.use(cors());
const User = require('../models/user');
const bcrypt = require('bcryptjs')
//register endpoint
router.post('/register', async (req,res)=> {
//    const confirm = await User.find({Username : req.body.username ,email : req.body.email})
//     confirm && res.status(400).json('this user or email exist');
    try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

const savedPost = await new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPass       

})
     const resultPost = await savedPost.save();
     console.log('Registration successful. Sending response.');
     res.status(200).json({ success: true });
  } catch (error) {
     res.status(500).json(error); 
  }
})

// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const validate = await bcrypt.compare(req.body.password, user.password);

        if (!validate) {
            return res.status(400).json({ error: 'Incorrect password' });
        }
        console.log('Login successful. Sending response.');
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error });
    }
});

module.exports=router;