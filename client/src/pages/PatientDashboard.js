import patient_profile from "../assets/img/dashboard/patient2_pbl.png";

import reports from "../assets/img/dashboard/report2_pbl.png";

import search from "../assets/img/dashboard/search2.png";
import Footer from "../components/landingPage/Footer";
import eye from "../assets/img/dashboard/eye.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie } from 'react-chartjs-2';
  const apiUrl = "https://medical-record-rxyo.onrender.com";

const PatientDashboard = (props) => {
  const navigate = useNavigate();

  const [dob, setDob] = useState("01/01/2006");
  const [patient, setPatient] = useState({
    name: {
      firstName: "",
      middleName: "",
      surName: "",
    },
    dob: "",
    mobile: "",
    email: "",
    adharCard: "",
    bloodGroup: "",
    address: {
      building: "",
      city: "",
      taluka: "",
      district: "",
      state: "",
      pincode: "",
    },
    password: "",
    diseases: [{ disease: "", yrs: "" }],
    contactPerson: {
      name: {
        firstName: "",
        surName: "",
      },
      mobile: "",
      email: "",
      relation: "",
      address: {
        building: "",
        city: "",
        taluka: "",
        district: "",
        state: "",
        pincode: "",
      },
    },
  });
  const [prescriptions, setPrescriptions] = useState([]);

  const convertDatetoString = (dateString) => {
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    async function getpatient() {
      // const res = await fetch(`${apiUrl}/getpatient`, {
      //   includeCredentials: true,
      // });
      // const data = await res.json();

      const response = await axios.get(`https://medical-record-rxyo.onrender.com/getpatient`, {
        withCredentials: true,
      });

      const data = response.data

      if (data.AuthError) {
        props.settoastCondition({
          status: "info",
          message: "Please Login to proceed!!!",
        });
        props.setToastShow(true);
        navigate("/");
      } else {
        setPatient(data.patient);
        setPrescriptions(data.patient.prescriptions);
      }
    }
    getpatient();
  }, [dob]);

  if(prescriptions.length > 0) {
    props.setPrescriptionID(prescriptions[0]._id);
  }

  const renderCharts = () => {
    if (!patient || !prescriptions) return null;
  
    const chiefComplaints = {};
    const prescribedMedications={};
    const diagnosisByDate = {};
    prescriptions.forEach((prescription) => {
      if (!prescription.chiefComplaints) return; // Check if chiefComplaints exists
      prescription.chiefComplaints.forEach((complaint) => {
        if (chiefComplaints[complaint.complaint]) {
          chiefComplaints[complaint.complaint]++;
        } else {
          chiefComplaints[complaint.complaint] = 1;
        }
      });

      prescription.medicines.forEach((medication) => {
        if (prescribedMedications[medication.medicineName]) {
          prescribedMedications[medication.medicineName      ]++;
        } else {
          prescribedMedications[medication.medicineName          ] = 1;
        }
      });

      const updatedAtDate = new Date(prescription.updatedAt);
    const formattedDate = `${updatedAtDate.getDate()}/${updatedAtDate.getMonth() + 1}/${updatedAtDate.getFullYear()}`;

    if (diagnosisByDate[formattedDate]) {
      diagnosisByDate[formattedDate].push({ date: formattedDate, diagnosis: prescription.diagnosis });
    } else {
      diagnosisByDate[formattedDate] = [{ date: formattedDate, diagnosis: prescription.diagnosis }];
    }
    });
    const prescribedMedicationsChartData = {
      labels: Object.keys(prescribedMedications),
      datasets: [
        {
          data: Object.values(prescribedMedications),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
          ],
        },
      ],
    };
    // Example: Format data for bar chart
    const barChartData = {
      labels: Object.keys(chiefComplaints),
      datasets: [
        {
          label: 'Chief Complaints',
          data: Object.values(chiefComplaints),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  
    // Example: Format data for pie chart
    const pieChartData = {
      labels: Object.keys(chiefComplaints),
      datasets: [
        {
          data: Object.values(chiefComplaints),
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
          ],
        },
      ],
    };
    const diagnosesArray = Object.values(diagnosisByDate).reduce((acc, curr) => acc.concat(curr), []);

    const diagnosisByDateChartData = {
      labels: Object.keys(diagnosisByDate),
      datasets: [
        {
          label: 'Diagnosis by Date',
          data: Object.values(diagnosisByDate),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        },
      ],
    };
  
    return (
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent:"space-around" }}>
  <div style={{ width: '80%', maxWidth: '600px', margin: '20px' }}>
    <h2 style={{ textAlign: 'center' }}>Chief Complaints</h2>
    <Bar data={barChartData} />
  </div>
  <div style={{ width: '80%', maxWidth: '600px', margin: '20px' }}>
    <h2 style={{ textAlign: 'center' }}>PresCribed Medicines Distribution</h2>
    <Pie data={prescribedMedicationsChartData} />
  </div>
  <div style={{  margin: '20px' }}>
  <h2 style={{ textAlign: 'center' }}>Diagnosis by Date</h2>
  <ul style={{ listStyle: 'none', padding: 0 }}>
    {diagnosesArray.map((entry, index) => (
      <li key={index} style={{ marginBottom: '10px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <span style={{ fontWeight: 'bold', marginRight: '10px' }}>{entry.date}:</span>
        <span>{entry.diagnosis}</span>
      </li>
    ))}
  </ul>
</div>
</div>
    );
  };

  return (
    <div className="full-body col-span-10 h-screen" style={{ overflow: 'auto' }}>
      <div className="body-without-footer max-h-min bg-bgprimary">
        <div className=" main ">
          <div className="">
            <div className="flex  h-12 m-2 bg-bgprimary rounded mt-4  ">
              <div>
                <h1 className="text-2xl font-poppins font-bold p-2 ">
                  DashBoard Today
                </h1>
              </div>

              <div className="flex ml-20  h-10   ">
                <input
                  placeholder="Search"
                  className="w-96 rounded ml-4 text-xl   pl-4 border focus:outline-none "
                ></input>
                <div className="bg-white pl-2 rounded ">
                  <img src={search} className=" h-6 mt-2  " alt="search"></img>
                </div>
              </div>

              <Link to="/patient/profile">
                <button className="flex bg-white rounded shadow  px-4  ml-60 h-14 ">
                  <img
                    src={patient_profile}
                    className="h-14 p-1 rounded-2xl"
                    alt="profile"
                  ></img>
                  <div className="mt-4 ml-4  font-bold font-poppins">
                    <h1>{`${patient.name.firstName}  ${patient.name.surName}`}</h1>
                  </div>
                </button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2">
            <div className="m-4 p-4">
              <div>
                <h1 className="font-bold font-poppins text-xl ">
                  Patient Details
                </h1>
              </div>
              <div className="bg-white font-poppins p-4 mt-4 px-8 rounded-xl shadow">
                <div className="flex">
                  <div>
                    <h1>Name : </h1>
                  </div>
                  <div className="flex ml-2   ">
                    <h1 className="pl-1">{patient.name.firstName}</h1>
                    <h1 className="pl-1">{patient.name.middleName}</h1>
                    <h1 className="pl-1">{patient.name.surName}</h1>
                  </div>
                </div>
                <div className="flex">
                  <div>
                    <h1>Date : </h1>
                  </div>
                  <div className="ml-2">
                    <h1>{convertDatetoString(patient.dob)}</h1>
                  </div>
                </div>
                <div className="flex">
                  <div>
                    <h1>Blood group : </h1>
                  </div>
                  <div className="ml-2">
                    <h1>{patient.bloodGroup}</h1>
                  </div>
                </div>
                <div>
                  <h1 className="font-bold mt-4">Past Health History</h1>
                  {patient.diseases.map((disease, index) => {
                    return (<span key={index}>{disease.disease + ' '}</span>)
                  })}
                </div>
              </div>
            </div>
            {/* recent health check up start */}
            <div className="m-4 p-4 ">
              <div>
                <h1 className="font-bold font-poppins text-xl ">
                  Recent Health Checkup
                </h1>
              </div>
              {prescriptions.length > 0 ? (
                <div className="bg-white mt-4 font-poppins p-4 rounded-xl shadow px-8">
                  <div className="flex ">
                    <div>
                      <h1>Consultant Doctor :</h1>
                    </div>
                    <div className="ml-2">
                      <h1>{`Dr. ${prescriptions[prescriptions.length-1].doctor}`}</h1>
                    </div>
                  </div>
                  <div className="flex">
                    <div>
                      <h1>Date :</h1>
                    </div>
                    <div className="ml-2">
                      <h1>{convertDatetoString(prescriptions[prescriptions.length-1].createdAt)}</h1>
                    </div>
                  </div>
                  <div className="flex">
                    <div>
                      <h1>Diagnosis : </h1>
                    </div>
                    <div className="ml-2">
                      <h1>{prescriptions[prescriptions.length-1].diagnosis}</h1>
                    </div>
                  </div>
                  <Link
                    to="/patient/prescription"
                    // onClick={() => {
                    //   props.setPrescriptionID(prescriptions[0]._id);
                    // }}
                  >
                    <div className=" mt-2 flex items-center justify-evenly text-base bg-primary py-1 px-2 rounded font-semibold font-poppins shadow-sm hover:bg-bgsecondary w-5/12  ">
                      <img src={reports} className="h-4" alt="report"></img>

                      <button className=" font-semibold pl-1">
                        Preview Prescription
                      </button>
                    </div>
                  </Link>
                </div>
              ) : (
                <div className="bg-white mt-4 font-poppins p-4 rounded-xl shadow px-8 flex justify-center font-bold">
                  {" "}
                  No Data Found...{" "}
                </div>
              )}
            </div>
            {/* recent health check up end */}
            <div></div>
          </div>

          {renderCharts()}
        </div>
      </div>
      <div className="mt-16 mb-0">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default PatientDashboard;
