const Patient = require("../models/patient");
const { generateAccessToken } = require("../utils/patientAccessToken");
//const fileupload=("../models/fileupload.js")
module.exports.preview_prescription = async (req, res) => {
  const id = req.params.id;
  const healthID = req.patient.healthID;
  
  if(!id) {
    res.status(400).json({ error: "Prescription ID not found" });
    return
  }

  try {
    const patient = await Patient.findOne({ healthID });
    const prescription = patient.prescriptions.filter((pres) => pres._id == id);
    res.status(200).json({ prescription: prescription[0], patient });
  } catch (err) {
    res.status(404).json({ error: "Something went wrong..." });
  }
};

module.exports.get_patient = async (req, res) => {
  let patient = req.patient;
  res.status(200).json({ patient });
};

module.exports.get_medcine = async (req, res) => {
  let patient = req.patient;
  // let patients = await Patient.find();
  // let patient=patients[1];
  const prescriptions=patient.prescriptions;

  const formattedPrescriptions = prescriptions.map(prescription => {
    const { doctor, updatedAt, medicines } = prescription;

    const formattedMedicines = medicines.map(medicine => {
      const { dosage, medicineName } = medicine;
      const { morning, afternoon, evening } = dosage;
  
   
      const totalDosage = morning.quantity + afternoon.quantity + evening.quantity;
  
      return {
        doctorName: doctor,
        updatedAt,
        medicineName,
        dosage: [
          { time: "Morning", quantity: morning.quantity },
          { time: "Afternoon", quantity: afternoon.quantity },
          { time: "Evening", quantity: evening.quantity },
        ],
        dosageQUantity: totalDosage, 
        duration: medicine.duration,
        diagnosis: medicine.diagnosis,
      };

    });  
    
    return formattedMedicines;
  });


  res.status(200).json(formattedPrescriptions );
  
};

module.exports.reset_token = async (req, res) => {
  try {
    const patient = req.patient;
    const newHealthID = generateAccessToken(new Date(), patient._id, patient.originalHealthID);
    const updatedPatient = await Patient.findByIdAndUpdate(patient._id, { healthID: newHealthID }, { new: true });
    res.status(200).json({ patient: updatedPatient });
  } catch(err) {
    console.log('Error while updating access token', err);
    res.status(500).json({ error: "Something went wrong..." });
  }
}