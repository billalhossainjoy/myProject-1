require("dotenv").config();
const UserModel = require("../models/UserModel");
const conversationModel = require("../models/conversationModels");
const jwt = require("jsonwebtoken");
const messagesModel = require("../models/messagesModel");

const getInbox = async (req, res) => {
  const cookie =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : false;
  try {
    let decode;
    let token = cookie["jwtToken"];
    decode = jwt.verify(token, process.env.jwttokenSecret);
    const conversationUsers = await conversationModel
      .find({ creatorId: decode.userId })
      .populate("participantId", "firstname fullname avatar");
    res.render("inbox", { ConversationUsers: conversationUsers });
  } catch (err) {
    console.log("unknown error!");
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

    const result = await newConversation.save();

    // console.log(conversationUser)
    // const users = await UserModel.findByIdAndUpdate(decoded.userId,{$push:{conversations: "654e857eb0672fb4621b2bd7"}})
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "unknown error!",
    });
  }
};

const inboxmessages = async (req, res) => {
  try {
    const cookies =
      Object.keys(req.signedCookies).length > 0 ? req.signedCookies : false;
    let decoded;
    if (cookies) {
      const token = cookies["jwtToken"];
      decoded = jwt.verify(token, process.env.jwttokenSecret);
    } else {
      res.status(500).json({
        message: "authentication failure",
      });
    }
    const senderid = decoded.userId;
    const reciverid = req.body.reciverid;
    const conversationID = req.body.coonversationid;
    const senderMsg = req.body.sendermsg;
    const newMasseage = new messagesModel({
      text: senderMsg,
      sender: senderid,
      reciver: reciverid,
      conversation_id: conversationID,
    });
    await newMasseage.save();
  } catch (error) {}
};

const getmessage = async (req, res) => {
  try {
    const conversations = await conversationModel.findOne({_id: req.params.cid})
    const conversationmessages = await messagesModel.find({conversation_id: req.params.cid}).sort("createdAt");
    const sender = await UserModel.findOne({_id:conversations.creatorId})
    const reciver = await UserModel.findOne({_id:conversations.participantId})
    const reciverObject = {}
    
    console.log(conversationmessages)

    res.status(200).json(conversationmessages);
  } catch (error) {}
};

module.exports = {
  getInbox,
  addConversation,
  inboxmessages,
  getmessage,
};
