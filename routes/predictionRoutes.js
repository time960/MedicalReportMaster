// register and login routes for the patient

const { Router } = require("express");
const {
    model_predict
} = require("../controllers/predictionController");

const router = Router();

router.post("/predict", model_predict);


module.exports = router;
