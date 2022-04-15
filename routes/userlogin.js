const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const router = require('express').Router();
const users = require('../models/users');
const admin = require("firebase-admin");
const registration = require('../models/registration')





router.get('/:uid',(req,res)=>{
    
    const sessionCookie = req.cookies.session || "";
    admin
    .auth()
    .verifySessionCookie(sessionCookie,true)
    .then(async()=>{

        try{
            const count_for_registration = await registration.countDocuments()
            const id = await users.findOne({uid:req.params.uid});
            const count_for_user = await users.countDocuments()
            const earning = count_for_user*10000
            if(id.email == 'admin@arnold.com'){
            res.render('admin.ejs',{
                name:id.name,
                email:id.email,
                address:id.address,
                age:id.age,
                image:id.image,
                pending_registration:count_for_registration,
                members_count :count_for_user,
                earning : earning

            })
        }else{
            res.render('user.ejs',{
                name:id.name,
                email:id.email,
                address:id.address,
                age:id.age,
                image:id.image
                
            })

        }

        }catch(err){
            console.log(err)
        }


    })
    

    // console.log(req.params.uid)

    // res.send({"message":"yes we got it"})
})









module.exports = router;