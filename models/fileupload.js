const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const fileupload = new mongoose.Schema({
  url: {
    type: String,
   },
   date:{
    type: Date,
    default:null
   },
   description: {
      type: String,
      default:"This has no description",
      required: true
   },
    patient_id: {
    type:  mongoose.Schema.Types.ObjectId, 
  },
});



const file = mongoose.model("fileupload", fileupload);

module.exports = file;
