import Footer from "../landingPage/Footer";
import patient_profile from "../../assets/img/dashboard/patient2_pbl.png";
import PatientReportCompo from "./PatientReportCompo";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const apiUrl = "https://medical-record-rxyo.onrender.com";

export default function PatientMedicine(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [medicines, setMedicines] = useState(null);

  useEffect(() => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        // hour: "numeric",
        // minute: "numeric",
      });
      return formattedDate;
    };

    const getMedicinesData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${apiUrl}/getmedicine`, {
          withCredentials: true,
          credentials: "include",
        });
        
        // Selecting the required data from the response
        const list = [];
        const prescriptions = response.data;
        prescriptions.forEach((prescription) => {
          prescription.forEach((medicine) => {
            medicine.visitingDate = formatDate(medicine.updatedAt);
            medicine.morning = medicine.dosage[0].quantity;
            medicine.afternoon = medicine.dosage[1].quantity;
            medicine.evening = medicine.dosage[2].quantity;
            list.push(medicine)
          });
        })

        setMedicines(list);
      } catch (err) {
        console.log(err);
        if(err.response && err.response.status === 401) {
          props.settoastCondition({
            status: "info",
            message: "Please Login to proceed!!!",
          });
          props.setToastShow(true);
          setLoading(false);
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    getMedicinesData();
    return () => {};
  }, []);

  if (loading) {
    return (
      <div
        className="patient-medicine col-span-10"
        style={{ padding: "5rem 4rem", width: "100%" }}
      >
        <Typography variant="h5" sx={{ fontWeight: "500" }} gutterBottom>
          Loading Table...
        </Typography>
      </div>
    );
  }

  if(medicines.length == 0) {
    return (
      <div
        className="patient-medicine col-span-10"
        style={{ padding: "5rem 4rem", width: "100%" }}
      >
        <Typography variant="h5" sx={{ fontWeight: "500" }} gutterBottom>
          No Medicines Found
        </Typography>
      </div>
    );
  }

  return (
    <div
      className="patient-medicine col-span-10"
      style={{ padding: "3rem 4rem", width: "100%", overflow: 'auto'}}
    >
      <div style={{ margin: "0 auto" }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: "500", paddingBottom: "1.5rem" }}
        >
          Medicine Table
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#eee" }}>
                <TableCell>Medicine</TableCell>
                <TableCell align="right">Doctor</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Duration</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Morning</TableCell>
                <TableCell align="right">Afternoon</TableCell>
                <TableCell align="right">Evening</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medicines.map((medicine, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {medicine.medicineName}
                  </TableCell>
                  <TableCell align="right">{medicine.doctorName}</TableCell>
                  <TableCell align="right">{medicine.visitingDate}</TableCell>
                  <TableCell align="right">{medicine.duration + ' days' || 'No data'}</TableCell>
                  <TableCell align="right">{medicine.dosageQUantity}</TableCell>
                  <TableCell align="right">{medicine.morning || 0}</TableCell>
                  <TableCell align="right">{medicine.afternoon || 0}</TableCell>
                  <TableCell align="right">{medicine.evening || 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

// const PatientMedicine = (props) => {
//   const navigate = useNavigate();
//   const [dob, setDob] = useState("01/01/2006");
//   const [patient, setPatient] = useState({
//     name: {
//       firstName: "",
//       middleName: "",
//       surName: "",
//     },
//     dob: "",
//     mobile: "",
//     email: "",
//     adharCard: "",
//     bloodGroup: "",
//     address: {
//       building: "",
//       city: "",
//       taluka: "",
//       district: "",
//       state: "",
//       pincode: "",
//     },
//     password: "",
//     diseases: [{ disease: "", yrs: "" }],
//     contactPerson: {
//       name: {
//         firstName: "",
//         surName: "",
//       },
//       mobile: "",
//       email: "",
//       relation: "",
//       address: {
//         building: "",
//         city: "",
//         taluka: "",
//         district: "",
//         state: "",
//         pincode: "",
//       },
//     },
//   });

//   const [prescriptions, setPrescriptions] = useState([{}]);

//   const convertDatetoString = (dateString) => {
//     let date = new Date(dateString);
//     let day = date.getDate();
//     let month = date.getMonth() + 1;
//     let year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   useEffect(() => {
//     async function getpatient() {
//       const response = await axios.get(`${apiUrl}/getpatient`, {
//         withCredentials: true,
//       });
//       const data = response.data
//       if (data.AuthError) {
//         props.settoastCondition({
//           status: "info",
//           message: "Please Login to proceed!!!",
//         });
//         props.setToastShow(true);
//         navigate("/");
//       } else {
//         setPatient(data.patient);
//         if (data.patient.prescriptions) {
//           setPrescriptions(data.patient.prescriptions.reverse());
//         }
//         setDob(convertDatetoString(patient.dob));
//       }
//     }
//     getpatient();
//   }, [dob]);

//   return (
//     <div className="col-span-10">
//      Implement Graph ... Patient's Medicines and their time...
//      Give Graph with patient's Desease and and Data

//       <div className="-mt-20 mb-0">
//         <Footer></Footer>
//       </div>
//     </div>
//   );
// };

// export default PatientMedicine;
