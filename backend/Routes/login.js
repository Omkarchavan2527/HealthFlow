const express = require("express");
const jwt = require("jsonwebtoken");
const { createHmac } = require("crypto");
const USER = require("../models/user");

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await USER.findOne({ username });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const hashedPassword = createHmac("sha256", existingUser.salt)
      .update(password)
      .digest("hex");

    if (hashedPassword !== existingUser.password) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: {
        id: existingUser._id,
        username: existingUser.username
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
