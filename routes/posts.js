const router = require('express').Router();
const verify = require('./verifyToken');
const User = require('../model/User'); 

router.get('/',verify, async (req,res) => {
    //res.send(req.user);
    console.log(req.user._id)
    try{
        const findUser = await User.findById(req.user._id)
        console.log(findUser)
        res.send(findUser)
    }catch(err){
        res.status(400).send({message:err})
    }
});

module.exports = router;

