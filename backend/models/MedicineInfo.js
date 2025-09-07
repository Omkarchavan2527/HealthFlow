const mongoose = require('mongoose');
const USER = require('./user');

const MedicineInfoSchema = new mongoose.Schema({
  MedicineName: {
        type: String,
        requird: true,
  },
   Type: {
        type: String,
        requird: true,
  }, 
  Schedule: {
        type: String,
        requird: true,
  }, 
  startDate: {
        type: String,
        requird: true,
  },
  Duration: {
        type: String,
        requird: true,
  },
  Frequency: {
        type: String,
        requird: true,
  },
  createdBy:{
     type: mongoose.Schema.Types.ObjectId,
      ref: 'USER' ,
      required:true,
  },  
  
},{timestamps:true});

module.exports = mongoose.model('MedicineInfo', MedicineInfoSchema);
