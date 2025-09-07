const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');
require("dotenv").config();

const addroute =require("./Routes/addremainder") ;
const LoginRoute=require("./Routes/login") 
const SignupRoute=require("./Routes/signup") 
const upcoming=require("./Routes/UpcomingMedi")
const medicinecounts =require("./Routes/medicinecount");
const medicineofday=require("./Routes/medicineofday")
const notificationRoutes =require ("./Routes/notification");
app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/medicine-remainder")
  .then(() => { console.log("MONGODB CONNECTED.") })


app.use("/add", addroute);
app.use("/login", LoginRoute);
app.use("/signup", SignupRoute);
app.use("/medicines",upcoming);
app.use("/today",medicinecounts);
app.use("/api/medicines",medicineofday)
app.use("/api", notificationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
