const path = require('path');
const registration = require('../models/registration');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const router = require('express').Router()

router.post('/', async (req, res) => {
    try {
        if (req.body) {
            const user = await registration.findOne({ number: req.body.number });
            if (user) {
                res.json({"message":"user already exists"})
            } else {

                const register = new registration({
                    name: req.body.name,
                    number: req.body.number,
                    address: req.body.address,
                    city: req.body.city,
                    gender: req.body.gender,
                });

                await register.save()
                res.json({ "message": "user details sent for registration" })
            }
        }
        else {
            res.json({ "message": "Please fill proper details" })
        }
    } catch (err) {
        res.json({ 'message': "something went wrong" })
    }
})

module.exports = router
