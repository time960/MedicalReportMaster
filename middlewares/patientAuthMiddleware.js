const jwt = require("jsonwebtoken");
const Patient = require("../models/patient");

const requirePatientAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log(token)
  if (token) {
    jwt.verify(token, "SECRET", async (err, decodedToken) => {
      if (err) {
        let AuthError = { error: "Patient is not authenticated!" };
        res.status(401).send({ AuthError });
      } else {
        const patient = await Patient.findById(decodedToken.id);
        console.log(decodedToken.id)
        req.patient = patient;
        next();
      }
    });
  } else {
    let AuthError = { error: "Patient is not authenticated!" };
    res.status(401).send({ AuthError });
  }
};

module.exports = { requirePatientAuth };
