const router = require('express').Router()
const users = require('../models/users')




router.get('/',async (req,res)=>{
    const userdata = await users.find()
    res.json(userdata)



})


module.exports = router;