const { Router } = require("express");
const {
  preview_prescription,
  get_patient,
  get_medcine,
  reset_token
} = require("../controllers/patientControllers");
const fileupload=require("../models/fileupload.js");
const { requirePatientAuth } = require("../middlewares/patientAuthMiddleware");
// const mongoose=require("mongoose");
const router = Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { default: mongoose } = require("mongoose");
const cloudinary = require('cloudinary').v2;
// try{cloudinary.config({
//   cloud_name: 'medace',
//   api_key: '339438147761498',
//   api_secret: 'JFRjerE6h--Hd1c88JHg5pNLFPk'
// });
// }catch(e){
//   console.log(e);

// }

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'pdf_uploads',
    format: async (req, file) => 'pdf',
    public_id: (req, file) => file.originalname.split('.')[0]
  }
});
const parser = multer({ storage: storage });
router.post('/upload',requirePatientAuth, parser.single('file'),async (req, res) => {
  try{
  if (req.file) {
    console.log(req.file.path,req.body)
    const urls=new fileupload(
      {
        patient:req.patient._id,
        description:req.body.description,
        date:req.body.date,
        url:req.file.path
      }
    
    );
    console.log(urls)
    await urls.save()
    res.json({ urls });
  } else {
    res.status(500).json({ error: 'Failed to upload file' });
  }
}
catch(err){
  console.log(err);
}
});

router.get('/files', requirePatientAuth,async(req, res,next) => {
  try{
    // console.log(req.patient)
const urls=await fileupload.find({patient:req.patient._id});
res.json({files:urls});
}
catch(err){
  console.log(err);
  res.status(500).json({ error: 'Failed to fetch' });
}
});
router.get('/file/:id', async(req, res) => {
  try{
const urls=await fileupload.find({patient:new mongoose.Types.ObjectId(req.params.id)});
res.json({files:urls});
}
catch(err){
  console.log(err);
  res.status(500).json({ error: 'Failed to fetch' });
}
});

router.get("/prescription/:id", requirePatientAuth, preview_prescription);
router.get("/getpatient", requirePatientAuth, get_patient);
router.get("/getmedicine", requirePatientAuth, get_medcine);
router.put('/reset-token', requirePatientAuth, reset_token)

module.exports = router;
