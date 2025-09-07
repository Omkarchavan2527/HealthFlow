const express = require("express");
const USER = require("../models/user");

const webpush = require("web-push");


async function schedule(userId,time,medicinename){
 console.log("hello from me");
  const title="time to take your medicine";  
 const body=`time to take medicine:${medicinename}`; 

  console.log("time given",time)
 
 const user = await USER.findById(userId);
 
  if (!user || !user.subscriptions.length) {
    return res.status(404).json({ error: "No subscriptions" });
  }

  console.log("date now",new Date())
  

  const delay = new Date(time) - new Date();
console.log("delay",delay)
  if (delay > 0) {
    setTimeout(() => {
console.log("hello ,fhsdf")
      user.subscriptions.forEach(sub => {
        webpush.sendNotification(sub, JSON.stringify({ title, body }))
          .catch(err => console.error("Push error", err));
      });

    }, delay);
  } else {
    console.warn("⏰ Scheduled time is in the past.");
  }
}


module.exports={schedule};