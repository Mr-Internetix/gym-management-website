const router = require('express').Router()
const announcements = require('../models/announcement')

router.post('/',async(req,res)=>{


    if(req.body.title){

        const new_announcements = new announcements({
            title:req.body.title,
            announcement:req.body.message,
            time:req.body.Date
        });

        const response = await new_announcements.save()

        res.json({'message':"Announcement saved"})
    }
    else{
         res.json({"message":"something went wrong"})
    }




})



router.get('/',async(req,res)=>{

    all_announcements = await announcements.find()

    res.json(all_announcements)
})







module.exports = router;