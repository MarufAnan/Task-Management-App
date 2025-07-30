const User = require('../models/User');
const bcrypt = require('bcryptjs');

// GET: View user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// PUT: Update name or password
exports.updateProfile = async (req, res) => {
  const { name, password } = req.body;

  try {
    const updates = {};
    if (name) updates.name = name;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(req.userId, updates, {
      new: true,
    }).select("-password");

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};
