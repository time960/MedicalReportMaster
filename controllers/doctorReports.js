
async function getDoctorReports(req, res) {
    const doctor = req.doctor
    try {
        const prescriptions = req.doctor.prescriptions
        res.status(200).json({ prescriptions, doctor })
    } catch(err) {
        console.log('Error while getting doctor reports: ', err)
        res.status(500).send({ error: 'Internal server error' })
    }
}

module.exports = getDoctorReports