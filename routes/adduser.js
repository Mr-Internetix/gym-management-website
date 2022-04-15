const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const router = require('express').Router();
const users = require('../models/users');


router.post('', async (req, res) => {

try{
    console.log(req.body)
    const id = await users.findOne({uid:req.body.userid});
    if(id){
        res.send({
            "uid":id.uid
        });
    }
    else{
        const user = new users( {
                
            uid: req.body.userid,
            name:req.body.name,
            email: req.body.email,
            address:req.body.address,
            age:req.body.age,
            image: req.body.imageUrl,
        });
        const userId = await user.save();
        
        const id = await users.findOne({uid: req.body.userid});

        await res.send({
            "uid":id.uid
        });


    }
}catch(err){
    return res.json({"message":"something went wrong"})
}




})



module.exports = router