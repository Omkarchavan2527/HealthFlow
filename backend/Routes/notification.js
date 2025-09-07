const express = require("express");
const USER = require("../models/user");

const webpush = require("web-push");
const { findOne } = require("../models/user");

const router = express.Router();

// In-memory storage for subscriptions
let subscriptions = [];

// Set up your VAPID keys here (same as server.js)
const publicVapidKey = "BNAPG4FIC-DmldQWu-z0snpuoiBjesMIlYRkoPNHQDN6T55uw6gFP5DUim5-a70-UBsxg20beAH4ziG6NZZXcPs";
const privateVapidKey = "zFnR6i4nlbS9l8RwfAlRlx5yyhE_Xm__jEZHKIhcR68";

webpush.setVapidDetails(
  "mailto:your-email@example.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe route
router.post("/subscribe", async (req, res) => {
  try {
    const { userId, subscription } = req.body;
    console.log("userId:", userId);
    console.log(subscription)

    const normalizedSubscription = {
      endpoint: subscription.endpoint || "",
      expirationTime: subscription.expirationTime ? new Date(subscription.expirationTime) : null,
      keys: {
        p256dh: subscription.keys?.p256dh || "",
        auth: subscription.keys?.auth || ""
      }
    };

    // Push subscription directly using $push
    const updatedUser = await USER.findByIdAndUpdate(
      userId,
      { $push: { subscriptions: normalizedSubscription } },
      { new: true } // Returns the updated document
    );

    if (!updatedUser) {
      return res.status(400).json({ error: "User not found" });
    }

    console.log("Updated subscriptions:", updatedUser.subscriptions);
    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.post("/schedule", async (req, res) => {
  const { userId, title, body, time } = req.body;

  const user = await USER.findById(userId);
  if (!user || !user.subscriptions.length) {
    return res.status(404).json({ error: "No subscriptions" });
  }
  console.log(time)

  const delay = new Date(time) - new Date();
  console.log(new Date())

  if (delay > 0) {
    setTimeout(() => {

      user.subscriptions.forEach(sub => {
        webpush.sendNotification(sub, JSON.stringify({ title, body }))
          .catch(err => console.error("Push error", err));
      });

    }, delay);
  } else {
    console.warn("⏰ Scheduled time is in the past.");
  }
  res.json({ success: true });
});

module.exports = router;
