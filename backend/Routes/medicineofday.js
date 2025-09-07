const express = require("express");
const router = express.Router();
const MedicineInfo = require("../models/MedicineInfo");
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
  try {
    const { id, date } = req.body;

    if (!id) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const queryDate = date ? new Date(date) : new Date();
    queryDate.setUTCHours(0, 0, 0, 0); // normalize to start of day

    // Fetch all medicines for the user
    const medicines = await MedicineInfo.find({ createdBy: id });

    const todaysMeds = [];
    const medsToDelete = [];

    medicines.forEach((med) => {
      const startDate = new Date(med.startDate);
      startDate.setUTCHours(0, 0, 0, 0);

      // Calculate duration in days
      let durationDays = 0;
      switch (med.Duration) {
        case "1 Week":
          durationDays = 7;
          break;
        case "1 Month":
          durationDays = 30;
          break;
        case "2 Months":
          durationDays = 60;
          break;
        default:
          durationDays = parseInt(med.Duration) || 0;
      }

      const dayDiff = Math.floor((queryDate - startDate) / (1000 * 60 * 60 * 24));

      // If medicine duration is over, mark for deletion
      if (dayDiff >= durationDays) {
        medsToDelete.push(med._id);
        return;
      }

      // Determine if medicine should be taken today based on frequency
      const freq = med.Frequency.toLowerCase();
      let takeToday = false;

      if (freq === "once" && dayDiff === 0) takeToday = true;
      else if (freq === "daily") takeToday = dayDiff < durationDays;
      else if (freq === "weekly" && dayDiff % 7 === 0) takeToday = dayDiff < durationDays;
      else if (freq === "monthly" && startDate.getDate() === queryDate.getDate()) takeToday = dayDiff < durationDays;

      if (takeToday) todaysMeds.push(med);
    
    
    });

    


    // Delete expired medicines
    if (medsToDelete.length > 0) {
      await MedicineInfo.deleteMany({ _id: { $in: medsToDelete } });
    }

    // Sort by startDate ascending
    todaysMeds.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    res.json(todaysMeds);
  } catch (err) {
    console.error("Error fetching medicines:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
