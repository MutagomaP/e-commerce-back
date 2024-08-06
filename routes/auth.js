const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    const { username, password,email } = req.body;
    
    try {
        const existUser  = await User.findOne({email: req.body.email});
        if(existUser)  {
            return res.status(400).json({success: false, message: 'User already registered', status: false})
        }else{

            const hashedPassword = bcrypt.hashSync(password, 10);
            const user = await User({
                 username, 
                 email,
                 password: hashedPassword });
            const newUser = await user.save();
            res.status(201).json({ message: 'User registered successfully',data: newUser});
        }
    } catch (error) {
        res.status(400).json({ message: 'Error registering user' });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user._id}, "process env JWT_SECRET");
    res.json({ token });
});

module.exports = router;