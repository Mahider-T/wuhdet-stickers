const Agent = require('../models/agent')

const addAgent = async (req, res) => {
    try {
        const {phoneNumber} = req.body;
        const agentExists = await Agent.findOne({phoneNumber});

        if(agentExists) return res.status(404).json({message: "User with the given phone number already exists."});
        const newAgent = new Agent({...req.body});
        await newAgent.save();
        return res.status(200).json({success: "true", message: "Agent saved successfully."})

    }catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const updateNumberOfDelivery = async (req, res) => {
    try{
        const {phoneNumber, changeBy} = req.body;
        const userExists = await Agent.findOne({phoneNumber: phoneNumber});

        if(!userExists) return res.status(404).json({Message: `Could not find user with phone number ${phoneNumber}`});
        userExists.incrementDelivery(changeBy);
        await userExists.save();
        res.status(200).json({message: "User updated successfully"});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
} 



module.exports = {addAgent, updateNumberOfDelivery};