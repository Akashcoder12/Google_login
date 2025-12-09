import jwt from "jsonwebtoken";
import User from "../models/Users.js";

export const googleLogin = async (req, res) => {
  try {
    const { name, email, picture } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ name, email, avatar: picture });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
};

export const userProfile = async (req, res) => {
  res.json({ user: req.user });
};
