const express = require("express");
const router = express.Router();
const MedicineInfo=require("../models/MedicineInfo")
router.get("/",(req,res)=>{
    
})
router.post("/",async(req,res)=>{

const {MedicineName,Type,Schedule,startDate,Duration,Frequency,createdBy}=req.body;
console.log(req.body);


if(!MedicineName||!Type||!Schedule||!startDate||!Duration||!Frequency) return res.send({err: "required all fields"});
await MedicineInfo.create({MedicineName,Type,Schedule,startDate,Duration,Frequency,createdBy})
// ,createdBy:req.body.user.id

res.send({msg:"sucesss"})
})


module.exports = router;
