const router = require('express').Router()
const registration = require('../models/registration')

router.get('/',async (req,res)=>{
    
    const registration_data = await registration.find()

    res.json(registration_data)

})







module.exports = router;