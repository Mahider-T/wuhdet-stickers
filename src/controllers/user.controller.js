const user = require('../models/user');

const saveUser = async (req, res) =>{
    try{
        const newUser = new user({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone
        })

        res.status(200).json({success: true, data: await newUser.save()})
    } catch(e) {
        res.status(500).json({success:false, data: e.message})
    }
}

module.exports = {saveUser}
