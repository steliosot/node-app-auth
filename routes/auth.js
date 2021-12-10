const router = require('express').Router();
const User = require('../model/User'); 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const {registerValidation} = require('../validation');
const {loginValidation} = require('../validation');

router.post('/register', async (req,res) => {

    // Validation 1: Check user input
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    // Validation 2: Check if user exists
    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists) return res.status(400).send({message:'Email exists'});

    // Password hash
    const salt = await bcrypt.genSalt(5);
    const hashedPassword  = await bcrypt.hash(req.body.password, salt);

    const user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try{
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send({err:message});
    }

});

// Login

router.post('/login', async (req,res) => {

    // Validation 1: Check user input
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    // Validation 2: Check if username exists
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).send({message:'Email is wrong'});

    // Validation 3: Check password
    const passwordExists = await bcrypt.compare(req.body.password, user.password);
    if(!passwordExists) return res.status(400).send({message:'Password is wrong'});

    // Create and assign a token

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    //res.send('Logged in!');
});

module.exports = router;

