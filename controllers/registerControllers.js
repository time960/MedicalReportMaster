const Patient = require("../models/patient");
const { createToken } = require("../utils/createToken");
const { generateAccessToken } = require("../utils/patientAccessToken");

const maxAge = 3 * 24 * 60 * 60;
const handleError = (err) => {
  let errors = {};

  // incorrect email
  if (err.message === "Invalid HealthID") {
    errors.healthID = "That HealthID is not registered";
  }

  // incorrect password
  if (err.message === "Incorrect Password") {
    errors.password = "That password is incorrect";
  }

  // duplicate error code
  if (err.code === 11000) {
    errors.healthID = "This AdharCard is already Registerd on System.";
    return errors;
  }

  if (err.message.includes("patient validation failed")) {
    let errorsarray = Object.values(err.errors);
    errorsarray.forEach(({ properties }) => {
      if (!properties.path.includes(".")) {
        errors[properties.path] = properties.message;
      }
    });
  }
  return errors;
};

module.exports.patient_register = async (req, res) => {
  console.log("Registering Patient");
  const diseases = req.body.diseases;
  const {
    name,
    dob,
    mobile,
    email,
    adharCard,
    bloodGroup,
    address,
    password,
    contactPerson,
  } = req.body;

  const originalHealthID = adharCard;
  const objectId = '5f8d0d55b54764421b7156c1';
  const healthID = generateAccessToken(new Date(), objectId, originalHealthID);

  try {
    const patient = await Patient.create({
      name,
      healthID,
      originalHealthID,
      dob,
      mobile,
      email,
      adharCard,
      bloodGroup,
      address,
      password,
      diseases,
      contactPerson,
    });
    const token = createToken(patient._id);
    res.cookie("jwt", token, {
      maxAge: 90000000, // 14 minutes
      httpOnly: true,
      // for https sites only
      sameSite: "none",
      secure: true,
    });
    res.status(200).json({ patient });
  } catch (err) {
    console.log("Catch Error", err);
    const errors = handleError(err);
    res.status(500).json({ errors });
  }
};

module.exports.patient_login = async (req, res) => {
  const { healthID, password } = req.body;
  try {
    console.log("LOGIN", req.body);
    const patient = await Patient.login(healthID, password);
    const token = createToken(patient._id);

    // res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.cookie("jwt", token, {
      maxAge: 90000000, // 14 minutes
      httpOnly: true,
      // for https sites only
      sameSite: "none",
      secure: true,
    });

    req.headers.authorization = token;
    
    console.log("Jwt Token", token);
    return res.status(200).json({ patient });
  } catch (err) {
    const errors = handleError(err);
    res.status(404).json({ errors });
  }
};
