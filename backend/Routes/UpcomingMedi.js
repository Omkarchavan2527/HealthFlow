const express = require("express");
const router = express.Router();
const MedicineInfo = require("../models/MedicineInfo"); 
const { schedule } = require("../Routes/schedule");
const windowSize = 4;

// -------------------- Global State --------------------
let userWindowState = {};
const adherenceState={};
const removedCount = {}; // { userId: number }
const notisend={}

const scheduleOrder = {
  "before breakfast": 1,
  "after breakfast": 2,
  "before lunch": 3,
  "after lunch": 4,
  "before dinner": 5,
  "after dinner": 6
};

const scheduleTimes = {
  "before breakfast": "07:30",
  "after breakfast": "07:47",
  "before lunch": "12:00",
  "after lunch": "14:00",
  "before dinner": "18:00",
  "after dinner": "20:43"
};

const normalizeSchedule = (str) => str?.toLowerCase().replace(/[-_]/g, ' ').trim() || "";
const getToday = () => new Date().toISOString().split("T")[0];

const getDurationDays = (durationStr) => {
  switch(durationStr) {
    case "1 Week": return 7;
    case "1 Month": return 30;
    case "2 Months": return 60;
    default: return parseInt(durationStr) || 0;
  }
};

function getTodayDateTime(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  let now = new Date();
  
  now.setHours(hours, minutes, 0, 0);
  return now;
}

// -------------------- Helper Functions --------------------

function getTodaysMedicines(medicines) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  return medicines.filter((med) => {
    const startDate = new Date(med.startDate);
    startDate.setUTCHours(0, 0, 0, 0);
    const dayDiff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    const freq = med.Frequency?.toLowerCase() || "";

    if (dayDiff < 0) return false;
    if (freq === "once" && dayDiff !== 0) return false;
    if (freq === "weekly" && dayDiff % 7 !== 0) return false;
    if (freq === "monthly" && startDate.getDate() !== today.getDate()) return false;

    return true;
  });
}

function sortMedicinesBySchedule(meds) {
  return meds.sort((a, b) => {
    const slotA = scheduleOrder[normalizeSchedule(a.Schedule)] || 999;
    const slotB = scheduleOrder[normalizeSchedule(b.Schedule)] || 999;
    return slotA - slotB;
  });
}

function takeMedicine(med) {
  console.log(`⏰ Time to take: ${med.name || med._id} (${med.Schedule})`);
}

// -------------------- Sliding Window --------------------

function refreshWindow(userId) {
  const state = userWindowState[userId];
  if (!state) return;

  const now = new Date();
  const newCurrent = [];

  // Keep medicines whose schedule time is not passed for scheduling
  state.currentWindow.forEach((med) => {
    const timeStr = scheduleTimes[normalizeSchedule(med.Schedule)];
    if (!timeStr || getTodayDateTime(timeStr) > now) {
      newCurrent.push(med);
    }
  });

  // Fill empty slots from remaining
  while (newCurrent.length < windowSize && state.remaining.length > 0) {
    newCurrent.push(state.remaining.shift());
  }

  state.currentWindow = sortMedicinesBySchedule(newCurrent);
}

// -------------------- Scheduler --------------------

function scheduleMedicineTriggers(userId, callback) {
  const state = userWindowState[userId];
  const adherence= adherenceState[userId];
  if (!state || !state.currentWindow) return;

  // Clear previous timers
  if (state.timers) state.timers.forEach(clearTimeout);
  state.timers = [];

  const now = new Date();

  state.currentWindow.forEach((med) => {
    const normalized = normalizeSchedule(med.Schedule);
    const timeStr = scheduleTimes[normalized];
    if (!timeStr) return;

    const medTime = getTodayDateTime(timeStr);
    if (medTime <= now){
      adherence.skipped++;
return;      
    } // skip past-schedule for timer only

    let delay = medTime.getTime() - now.getTime() - 30 * 1000;
    if (delay < 0) delay = 0;
  // console.log(delay)
    const timerId = setTimeout(() => {
      try {
        callback(med);
        schedule(userId, medTime, state.currentWindow)
          .then(() => state.access.push(med))
          .then(() => console.log("✅ Successfully sent schedule",medTime))
          .catch((err) => console.error("❌ Schedule error:", err));
      } catch (err) {
        console.error("❌ Trigger error:", err);
      }
    }, delay);
    
    state.timers.push(timerId);
  });
}

// -------------------- Routes --------------------

router.post("/window", async (req, res) => {
  try {
    const { userId, allMedicines } = req.body;
  const adherence= adherenceState[userId];

    if (!userId || !Array.isArray(allMedicines))
      return res.status(400).json({ error: "Invalid request" });

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const medsToKeep = [];
    const medsToDelete = [];

    allMedicines.forEach((med) => {
      const startDate = new Date(med.startDate);
      startDate.setUTCHours(0, 0, 0, 0);
      const dayDiff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
      const durationDays = getDurationDays(med.Duration);

      if (dayDiff >= durationDays) medsToDelete.push(med._id);
      else if (dayDiff >= 0) medsToKeep.push(med);
    });

    if (medsToDelete.length > 0) {
      await MedicineInfo.deleteMany({ _id: { $in: medsToDelete } });
      console.log("🗑 Deleted expired meds:", medsToDelete);
    }

    let todaysMeds = getTodaysMedicines(medsToKeep);
    sortMedicinesBySchedule(todaysMeds);

    const state = userWindowState[userId];
    const todayStr = getToday();
    if (!state || state.lastAccess !== todayStr) {
      userWindowState[userId] = {
        currentWindow: todaysMeds.slice(0, windowSize),
        remaining: todaysMeds.slice(windowSize),
        lastAccess: todayStr,
        access:[],
        timers: []
    
      };
       adherenceState[userId]={
      taken:0,
      skipped:0,
      totalPrescribed:todaysMeds.length,
    };
        
    }
    const total=todaysMeds.length
    refreshWindow(userId);
    scheduleMedicineTriggers(userId, takeMedicine);
    console.log(userWindowState[userId].access);
    res.json({
      currentWindow:userWindowState[userId].currentWindow,
      total,
      adherence,
      

    });
  } catch (err) {
    console.error("Error in /window:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/window/remove", (req, res) => {
  const { userId, index } = req.body;
  const adherence= adherenceState[userId];

  if (!userId || index === undefined)
    return res.status(400).json({ error: "Invalid request" });

  const state = userWindowState[userId];
  if (!state) return res.status(400).json({ error: "User state not found" });

  // Reset daily if needed
  const todayStr = getToday();
  if (state.lastAccess !== todayStr) {
    const merged = [...state.currentWindow, ...state.remaining];
    let todaysMeds = getTodaysMedicines(merged);
    sortMedicinesBySchedule(todaysMeds);

    state.currentWindow = todaysMeds.slice(0, windowSize);
    state.remaining = todaysMeds.slice(windowSize);
    state.lastAccess = todayStr;
    adherenceState[userId]={
      taken:0,
      skipped:0,
      totalPrescribed:todaysMeds.length,
    }
  }

  // Remove medicine by index
  if (index < 0 || index >= state.currentWindow.length)
    return res.status(400).json({ error: "Invalid index" });

  state.currentWindow.splice(index, 1);
adherence.taken++;
  // Shift next from remaining
  if (state.remaining.length > 0) {
    state.currentWindow.push(state.remaining.shift());
  }

  // ✅ Increment removal counter
  if (!removedCount[userId]) removedCount[userId] = 0;
  removedCount[userId]++;

  scheduleMedicineTriggers(userId, takeMedicine);
const adherencerate=(adherence.taken/adherence.totalPrescribed)*100;
  res.json({
    currentWindow: state.currentWindow,
    removedCount: removedCount[userId], // send count back
    adherence,
    adherencerate:adherencerate.toFixed(2)+"%"

  });
});


module.exports = router;
