const { Router } = require("express");
const { requireDoctorAuth } = require("../middlewares/doctorAuthMiddleware");
const {
  doctor_login,
  doctor_register,
} = require("../controllers/doctorAuthControllers");
const {
  add_prescription,
  view_prescription,
  view_prescription2
} = require("../controllers/prescriptionControllers");
const { requireAdminAuth } = require("../middlewares/adminAuthMiddleware");
const {
  search_patient,
  get_doctor,
} = require("../controllers/doctorControllers");
const getDoctorReports = require('../controllers/doctorReports')
const Patient = require('../models/patient')
const Doctor = require('../models/doctor')

const router = Router();

// router.post("/register/doctor",  doctor_register);
// router.post("/login/doctor", doctor_login);
// router.post("/prescription/:healthID", add_prescription);
// router.get("/searchpatient/:healthID",  search_patient);
// router.get(
//   "/viewprescription/:healthID/:id",
//   view_prescription
// );
// router.get("/getdoctor",get_doctor);

router.post("/register/doctor", requireAdminAuth, doctor_register);
router.post("/login/doctor", doctor_login);
router.post("/prescription/:healthID", requireDoctorAuth, add_prescription);
router.get("/searchpatient/:healthID", requireDoctorAuth, search_patient);
router.get(
  "/viewprescription/:healthID/:id",
  requireDoctorAuth,
  view_prescription
);
router.get('/doctor/:prescriptionID', view_prescription2);
router.get("/getdoctor", requireDoctorAuth, get_doctor);
router.get('/doctor-reports', requireDoctorAuth, getDoctorReports);

router.get('/test', async (req, res) => {
  console.log('Test route hit')
  const patient = await Patient.findOne({ healthID: '123456' })
  const doctor = await Doctor.findOneAndUpdate(
    { email: 'json@gmail.com' },
    { $set: { prescriptions: patient.prescriptions } },
    { new: true }
  );
  res.json({ prescriptions: doctor.prescriptions })
})

module.exports = router;
