const { Router } = require("express");
const { get_admin } = require("../controllers/authControllers");
const {
  delete_doctor,
  delete_patient,
} = require("../controllers/deleteControllers");
const {
  getPatientsData
} = require("../controllers/adminController");
const {
  view_patientlist,
  view_doctorlist,
} = require("../controllers/fetchlistControllers");
const { requireAdminAuth } = require("../middlewares/adminAuthMiddleware");

const router = Router();

// router.delete("/deletedoctor/:id",  delete_doctor);
// router.delete("/deletepatient/:healthID", delete_patient);
// router.get("/getadmin",  get_admin);

// router.get("/doctorlist",  view_doctorlist);
// router.get("/patientlist", view_patientlist);

router.delete("/deletedoctor/:id",  delete_doctor);
router.delete("/deletepatient/:healthID", requireAdminAuth, delete_patient);
router.get("/getadmin", requireAdminAuth, get_admin);
router.get("/getdetails", getPatientsData);
router.get("/doctorlist", requireAdminAuth, view_doctorlist);
router.get("/patientlist", requireAdminAuth, view_patientlist);

module.exports = router;
