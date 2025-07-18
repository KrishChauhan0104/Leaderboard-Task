const User = require("../models/User");
const History = require("../models/History");

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.addUser = async (req, res) => {
  const { name } = req.body;
  const newUser = new User({ name });
  await newUser.save();
  res.status(201).json(newUser);
};

exports.claimPoints = async (req, res) => {
  const { userId } = req.body;
  const points = Math.floor(Math.random() * 10) + 1;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  user.totalPoints += points;
  await user.save();

  const history = new History({ userId, points });
  await history.save();

  res.json({ user, points });
};

exports.getLeaderboard = async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  const leaderboard = users.map((user, index) => ({
    name: user.name,
    totalPoints: user.totalPoints,
    rank: index + 1,
  }));
  res.json(leaderboard);
};
