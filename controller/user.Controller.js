const User = require("../models/user");
const getAllUser = async (req, res) => {
  try {
    const user = await User.find().select("-password").lean();
    if (!user.length) {
      return res.status(400).json({ message: "No users found" });
    }
    res.status(200).json({ message: "All Users" }, user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = getAllUser;
