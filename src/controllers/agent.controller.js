// const agent = require('../models/agent');
const Agent = require('../models/agent');
const uploader = require('../utils/uploader');

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

const updateAgentDetails = async (req, res) => {
    try{ 

        const update = req.body;
        const id = req.params.agentId;

        // const userId = req.user._id;
        //Make sure the passed id is that of the logged in user
        // if (userId.toString() !== id.toString()) return res.status(401).json({message: "Sorry, you don't have the permission to upd this data."}); 

        // const agentExists = await Agent.findOne({_id: id});
        // if(!agentExists) return res.status(404).json({message: `No matching agent found`});

        const agent = await Agent.findByIdAndUpdate(id, req.body, {new: true});
        if (!req.file) {return res.status(200).json({success: true, updatedUser: agent, message: "Agent updated successfully."});}

        const result = await uploader(req);
        imageUrl = result.url;
        console.log(imageUrl);

        const user_ = await Agent.findByIdAndUpdate(id, {
            $set: {
              ...update,
              profileImage: imageUrl,
            },
            new: true,
          });
          
        // let user_ = await Agent.findByIdAndUpdate(id, {$set: update}, {new: true});
        // user_ = await Agent.findByIdAndUpdate(id, {$set: {profileImage: result.url}})
        // const imageUrl = await Agent.findOne({id: id}, {profileImage: 1});
        // console.log(imageUrl);
        
        return res.status(200).json({success: true, updatedUser: user_, message: "Agent updated successfully."});

    }catch(error) {
        // console.log(typeof(uploader));
        console.log(error);
        res.status(500).json({message: error.message})
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

const uploadImage = async (req, res) => {

}

module.exports = {addAgent, updateNumberOfDelivery, updateAgentDetails};