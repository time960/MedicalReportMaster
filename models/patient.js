const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail, isMobilePhone } = require("validator");
const prescriptionSchema = require("./prescription");
// const res = require("express/lib/response");

const patientSchema = new mongoose.Schema({
  healthID: {
    type: String,
    required: true,
  },
  originalHealthID: {
    type: String,
    required: true
  },
  name: {
    firstName: {
      type: String,
      required: [true, "Please enter full Name"],
    },
    middleName: {
      type: String,
      required: false
    },
    surName: {
      type: String,
      required: [true, "Please enter full Name"],
    },
  },
  dob: {
    type: Date,
    required: [true, "Please enter Date of Birth"],
  },
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    validate: [isEmail, "Please Enter a valid Email"],
  },
  adharCard: {
    type: Number,
    unique: [true, "This AdharCard is already Registerd on System."],
    required: [true, "Please enter AdharCard Number"],
    minlength: [6, "Please enter a valid AdharCard Number"],
  },
  bloodGroup: {
    type: String,
    required: [true, "Please enter Blood Group"],
  },
  address: {
    building: {
      type: String,
      required: [true, "Please enter complete Address"],
    },
    city: {
      type: String,
      required: [false, "Please enter complete Address"],
    },
    taluka: {
      type: String,
      required: [false, "Please enter complete Address"],
    },
    district: {
      type: String,
      required: [false, "Please enter complete Address"],
    },
    state: {
      type: String,
      required: [false, "Please enter complete Address"],
    },
    pincode: {
      type: Number,
      min: [100000, "Please enter a valid pincode"],
      max: [999999, "Please enter a valid pincode"],
      required: [false, "Please enter complete Address"],
    },
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    minlength: [3, "Minimum length of password should must be 3 characters"],
  },
  diseases: [
    {
      disease: {
        type: String,
      },
      yrs: {
        type: Number,
      },
    },
  ],
  contactPerson: {
    name: {
      firstName: {
        type: String,
        required: [true, "Name of contact person is required"],
      },
      surName: {
        type: String,
        required: [true, "Name of contact person is required"],
      },
    },
    mobile: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      lowercase: false,
      validate: [isEmail, "Please enter a valid email."],
    },
    relation: {
      type: String,
    },
    address: {
      building: {
        type: String,
        required: [true, "Please enter complete Address of contact person"],
      },
      city: {
        type: String,
        required: [false, "Please enter complete Address of contact person"],
      },
      taluka: {
        type: String,
        required: [false, "Please enter complete Address of contact person"],
      },
      district: {
        type: String,
        required: [false, "Please enter complete Address of contact person"],
      },
      state: {
        type: String,
        required: [false, "Please enter complete Address of contact person"],
      },
      pincode: {
        type: Number,
        required: [false, "Please Enter complete Address of contact person"],
      },
    },
  },
  prescriptions: [prescriptionSchema],
});

patientSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

patientSchema.statics.login = async function (healthID, password) {
  const patient = await this.findOne({ healthID });
  if (!healthID) {
    throw Error("Please enter HealthId");
  }
  if (patient) {
    const auth = await bcrypt.compare(password, patient.password);
    if (auth) {
      return patient;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Invalid HealthID");
};

const Patient = mongoose.model("patient", patientSchema);

module.exports = Patient;
