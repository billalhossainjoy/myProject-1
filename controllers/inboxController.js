require("dotenv").config();
const UserModel = require("../models/UserModel");
const conversationModel = require("../models/conversationModels");
const jwt = require("jsonwebtoken");

const getInbox = async (req, res) => {
  const cookie = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : false;
  try {
      let decode;
      let token = cookie['jwtToken']
      decode = jwt.verify(token,process.env.jwttokenSecret)
      const conversationUsers = await conversationModel.findOne({creatorId:decode.userId}).populate("participantId", "firstname fullname avatar")
      console.log(conversationUsers.participantId);
      res.render("inbox",{ConversationUsers : conversationUsers.participantId}); 
  } catch (err) {
      console.log('unknown error!');
      console.log(err);
  }
};
const addConversation = async (req, res) => {
  const cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : false;
  try {
    let decoded;
    if (cookies) {
      const token = cookies["jwtToken"];
      decoded = jwt.verify(token, process.env.jwttokenSecret);
    } else {
      res.status(500).json({
        message: "authentication failure",
      });
    }
    const newConversation = new conversationModel({
      creatorId: decoded.userId,
      participantId: req.body.perticipentId,
    });
    const conversationUser = await conversationModel.findOne({
      creatorId: decoded.userId,
    });

    if (conversationUser) {
      const logged =await conversationModel.findOneAndUpdate(
        { _id: conversationUser._id },
        { $push: { participantId: req.body.perticipentId } }
      )
    }else{
        const result = await newConversation.save();
    }

    // console.log(conversationUser)
    // const users = await UserModel.findByIdAndUpdate(decoded.userId,{$push:{conversations: "654e857eb0672fb4621b2bd7"}})
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "unknown error!",
    });
  }
};

module.exports = {
  getInbox,
  addConversation,
};
