const express = require("express");
const router = express.Router();
const MedicineInfo=require("../models/MedicineInfo");


router.get("/", async (req, res) => {
  try {
    const pipeline = [
      // 1. Convert startDate string -> Date, and compute Mongo "today"
      {
        $addFields: {
          startDateObj: { $toDate: "$startDate" },
          todayMongo: { $dateTrunc: { date: "$$NOW", unit: "day" } }
        }
      },
      // 2. Only include medicines starting today or earlier
      {
        $match: {
          $expr: { $lte: ["$startDateObj", "$todayMongo"] }
        }
      },
      // 3. Compute dayDiff and convert Duration string into days
      {
        $addFields: {
          dayDiff: {
            $floor: {
              $divide: [
                { $subtract: ["$todayMongo", "$startDateObj"] },
                1000 * 60 * 60 * 24
              ]
            }
          },
          durationDays: {
            $switch: {
              branches: [
                { case: { $regexMatch: { input: "$Duration", regex: /day/i } }, then: 1 },
                { case: { $regexMatch: { input: "$Duration", regex: /week/i } }, then: 7 },
                { case: { $regexMatch: { input: "$Duration", regex: /month/i } }, then: 30 }
              ],
              default: 0
            }
          }
        }
      },
      // 4. Apply frequency rules
      {
        $match: {
          $or: [
            // Once: only within duration window
            {
              $and: [
                { Frequency: "Once" },
                { $expr: { $lte: ["$dayDiff", { $subtract: ["$durationDays", 1] }] } }
              ]
            },
            // Daily
            { Frequency: "Daily" },
            // Weekly
            {
              $and: [
                { Frequency: "Weekly" },
                { $expr: { $eq: [{ $mod: ["$dayDiff", 7] }, 0] } }
              ]
            },
            // Monthly (same day-of-month as startDate)
            {
              $and: [
                { Frequency: "Monthly" },
                {
                  $expr: {
                    $eq: [
                      { $dayOfMonth: "$startDateObj" },
                      { $dayOfMonth: "$todayMongo" }
                    ]
                  }
                }
              ]
            }
          ]
        }
      }
    ];

    const medicines = await MedicineInfo.aggregate(pipeline);
    res.json(medicines.length);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports=router;
