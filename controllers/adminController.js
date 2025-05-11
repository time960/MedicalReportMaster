const Doctor = require("../models/doctor");
const Patient = require("../models/patient");

module.exports.getPatientsData=async(req,res)=> {
    const patients = await Patient.aggregate([
      {
        $unwind: '$prescriptions', // Unwind prescriptions array
      },
      {
        $addFields: {
          citys: '$address.city',
          investigationss:'$prescriptions.investigations',
          date:{ $dateToString: { format: '%Y-%m-%d', date: '$prescriptions.updatedAt' } },
          chiefComplaintss:'$prescriptions.chiefComplaints',
          diseasess:'$diseases.name',
          bloodGroup:"$bloodGroup",
          medicine: '$prescriptions.medicines'
          // 'address.city':1,          
          // 'prescriptions.updatedAt': 1,
          // 'prescriptions.investigations': 1,
          // 'prescriptions.medicines': 1,
          // 'prescriptions.chiefComplaints': 1,
        },
      },
      {
     $group: {
      _id: { 
      date: '$date', 
      city: '$citys'
    },
    diseases:{ $push: '$diseasess' },
    bloodGroups:{ $push: '$bloodGroup' },
      investigations:{ $push: '$investigationss' },
      chiefComplaints:{ $push: '$chiefComplaintss' },
      medicines: { $push: '$medicine' },
     
     }
      },
      {
        $project: {
          investigations:1,
          chiefComplaints:1,
          medicines:1,
          diseases:1,
          bloodGroups:1,

        }
      }
    ]);
  
    return res.json(patients);
  }
  