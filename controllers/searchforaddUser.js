const UserModel = require("../models/UserModel");
const serarchUsers = async (req, res) => {
  const searchparameter =
    typeof req.body.username == "string" ? req.body.username : "a";
  try {
    const users = await UserModel.find({
      $or: [
        { email: searchparameter },
        { firstname: { $regex: searchparameter, $options: "i" } },
        { lastname: { $regex: searchparameter, $options: "i" } },
        { fullname: { $regex: searchparameter, $options: "i" } },
        { phone: { $regex: searchparameter } },
      ],
    });
    const userObject = [];
    for (let i = 0; i < users.length; i++) {
      userObject[i] = {
        avatar: users[i].avatar,
        username: users[i].firstname + " " + users[i].lastname,
        id: users[i]._id
      };
    }
    res.status(201).json(userObject);
  } catch (error) {
    res.status(200).json([]);
  }
};

module.exports = { serarchUsers };
