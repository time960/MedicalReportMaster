import doctor_profile from "../assets/img/dashboard/doctor2.png";
import reports from "../assets/img/dashboard/report2_pbl.png";
import search from "../assets/img/dashboard/search2.png";
import add_pre_logo from "../assets/img/dashboard/add_prescription_logo.png";
import Footer from "../components/landingPage/Footer";
import eye from "../assets/img/dashboard/eye.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import Dashboard from "../components/doctorDashboard/Dashboard";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
const DoctorDashboard = (props) => {
  const apiUrl = "https://medical-record-rxyo.onrender.com";

  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [dob, setDob] = useState("01/01/2006");
  const [patient, setPatient] = useState({});
  const [prescriptions, setPrescriptions] = useState([{}]);
  const [passPrescriptions, setPassPrescriptions] = useState([{}]);
  const [files, setFiles] = useState([]);
  const [doctor, setDoctor] = useState({
    name: {
      firstName: "",
      middleName: "",
      surName: "",
    },
    org: "",
    orgAddress: {
      building: "",
      city: "",
      taluka: "",
      district: "",
      state: "",
      pincode: "",
    },
    emergencyno: "",
    orgNumber: "",
    dob: "",
    mobile: "",
    email: "",
    adharCard: "",
    bloodGroup: "",
    education: [{ degree: "" }],
    address: {
      building: "",
      city: "",
      taluka: "",
      district: "",
      state: "",
      pincode: "",
    },
    prescriptions:[],
    specialization: [{ special: "" }],
    password: "",
    _id: "",
  });

  const convertDatetoString = (dateString) => {
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function getdoctor() {
      // setLoading(true);
      try {
        const response = await axios.get(`${apiUrl}/getdoctor`, {
          withCredentials: true,
          credentials: "include",
          crossDomain: true,
        })
       
        const data=response.data.doctor;
 
        setDoctor(response.data.doctor);
        // if(data.prescriptions){console.log(doctor.prescriptions);setPassPrescriptions(doctor.prescriptions)}
        // console.log("PRescription",passPrescriptions,data.prescriptions);
        // setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
        navigate("/");
      }

    //  let data = await axios.get(`https://medical-record-rxyo.onrender.com/getdoctor`, {
    //     withCredentials: true,
    //     credentials: "include",
    //     crossDomain: true,
    //   });
    //   console.log('Getting doctor data',  data)

    //    data =  data.data;
    //   if (data.AuthError) {
    //     props.settoastCondition({
    //       status: "info",
    //       message: "Please Login to Proceed!!!",
    //     });
    //     props.setToastShow(true);
    //     navigate("/");
    //   } else {
    //     setDoctor(data.doctor);
    //   }
    }

    async function getpatient() {
      setLoading(true);
      if (props.healthID.length >1) {
        try{
        let data = null;
        try{
          data= await axios.get("https://medical-record-rxyo.onrender.com"+`/searchpatient/${props.healthID}`,{
          withCredentials:true,
          credentials: "include",
        });
      }
      catch(e){
        setLoading(false);
        props.settoastCondition({
          status: "error",
          message: "This HealthID doesn't exist!!!",
        });
        props.setToastShow(true);
      }
      console.log("in search",data)
        data=data.data;
        if(!data){
          setLoading(false);
          props.settoastCondition({
            status: "error",
            message: "This HealthID doesn't exist!!!",
          });
          props.setToastShow(true);
        }
        if (data.patient.prescriptions) {
          setPrescriptions(data.patient.prescriptions.reverse());
        }

        if (data.AuthError) {
          setLoading(false);
          props.settoastCondition({
            status: "info",
            message: "Please Login to proceed!!!",
          });
          props.setToastShow(true);
          navigate("/");
        } else if (data.error) {
          setLoading(false);
          props.settoastCondition({
            status: "error",
            message: "This HealthID doesn't exist!!!",
          });
          props.setToastShow(true);
        } else {
          setPatient(data.patient);
          setDob(convertDatetoString(patient.dob));
          setLoading(false);
        }
      }
      catch(err){
          setLoading(false);
              props.settoastCondition({
                status: "error",
                message: "This HealthID doesn't exist!!!",
              });
              props.setToastShow(true);
        }  
      
      } else if (props.healthID.length === 0) {
        setLoading(false);
        setPatient({});
      }
      setLoading(false);
      
    }

    getdoctor();
    getpatient();
  }, []);


  const searchPatient = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (props.healthID.length >= 1) {
      try{
        console.log("clicked here")
      let data = await axios.get(`${apiUrl}/searchpatient/${props.healthID}`,{withCredentials:true});
    data=data.data
    console.log(data)
    if(data){ 
      const reponsefiles = await axios.get(`https://medical-record-rxyo.onrender.com/file/${data.patient._id}`, {
      withCredentials: true,
      credentials: "include",
      crossDomain: true,
    });
    if(reponsefiles.data){
      setFiles(reponsefiles.data.files)
    }
  }
      if (data.patient.prescriptions) {
        setPrescriptions(data.patient.prescriptions.reverse());
      }

      if (data.AuthError) {
        setLoading(false);
        props.settoastCondition({
          status: "info",
          message: "Please Login to proceed!!!",
        });
        props.setToastShow(true);
        navigate("/");
      } else if (data.error) {
        setLoading(false);
        props.settoastCondition({
          status: "error",
          message: "This HealthID doesn't exist!!!",
        });
        props.setToastShow(true);
      } else {
        setPatient(data.patient);
        setDob(convertDatetoString(patient.dob));
        setLoading(false);
      }
    }catch(e){
      console.log(e);
      setLoading(false);
      props.settoastCondition({
        status: "error",
        message: "This HealthID doesn't exist!!!",
      });
      props.setToastShow(true)
    }

    } else {
      props.settoastCondition({
        status: "warning",
        message: "Please Enter 6 Digit HealthID !!!",
      });
      props.setToastShow(true);
    }
  };


  return (
    <div className="full-body col-span-10 h-screen">
      <div className="body-without-footer   bg-bgprimary ">
        <div className="main    m-2  ">

          {/* dashboard today start */}
          <div className="">
            <div className="flex  h-12 m-2 bg-bgprimary rounded mt-4 ">
              <div>
                <h1 className="text-2xl font-poppins font-bold p-2 ">
                  DashBoard Today
                </h1>
              </div>

              {/* Upper Search Bar */}
              <div className="flex ml-20  h-10   ">
                <input
                  placeholder="Search"
                  className="w-96 rounded ml-4 text-xl   pl-4 border focus:outline-none "
                ></input>
                <div className="bg-white pl-2 rounded ">
                  <img src={search} className=" h-6 mt-2  " alt="search"></img>
                </div>
              </div>

              {/* Doctor Profile Image */}
              <Link to="/doctor/profile">
                <div className="flex bg-white rounded shadow  px-4  ml-60 h-14 ">
                  <img
                    src={doctor_profile}
                    className="w-12 p-1 rounded-2xl"
                    alt="profile"
                  ></img>
                  <div className="grid grid-rows-2 ml-4 gap-2  mb-4">
                    <div className="font-bold font-poppins text-base">
                      <h1 className="">
                        {`Dr. ${doctor.name.firstName} ${doctor.name.surName}`}
                      </h1>
                    </div>
                    <div className="">
                      <h2 className="text-sm">
                        {doctor.specialization[0].special}
                      </h2>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
          {/* dashboard today end */}

          {/* Search Patient With their id */}  
          <form
            onSubmit={searchPatient}
            className="grid grid-cols-9 bg-white rounded p-4 ml-12 mr-8 mt-4 shadow"
          >
            <div className="grid col-start-1 col-span-3">
              <h1 className="text-xl font-poppins font-bold p-2 ">
                Search Patient By Health Id :
              </h1>
            </div>
            <div className=" grid col-span-3">
              <input
                placeholder="Health ID"
                className="bg-bgsecondary rounded border-2 text-xl   pl-4  focus:outline-none"
                value={props.healthID}
                onChange={(e) => {
                  props.setHealthID(e.target.value);
                }}
              >
              </input>
            </div>
            {Loading ? (
              <div className="grid col-start-8  h-10 ml-4">
                <ReactLoading
                  type={"bubbles"}
                  color={""}
                  height={"45%"}
                  width={"45%"}
                />
              </div>
            ) : (
              <div className=" grid col-start-8  h-10 ml-4  bg-primary  rounded font-semibold font-poppins shadow-sm hover:bg-bgsecondary  ">
                <div className="flex py-2 px-4 items-center ">
                  <img src={search} className=" h-4  " alt="search"></img>
                  <button className="ml-2 flex  rounded font-semibold font-poppins shadow-sm hover:bg-bgsecondary   ">
                    Search
                  </button>
                </div>
              </div>
            )}
            <div className="grid col-start-9  h-10 ml-4  bg-primary  rounded font-semibold font-poppins shadow-sm hover:bg-bgsecondary  ">
              <div className="flex py-2 px-4 items-center ">
                <div
                  className="ml-2 flex cursor-pointer rounded font-semibold font-poppins shadow-sm hover:bg-bgsecondary "
                  onClick={() => {
                    props.setHealthID("");
                  }}
                >
                  Remove
                </div>
              </div>
            </div>
          </form>

          {Object.keys(patient).length !== 0 ? (
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
                    <div className="flex justify-between">
                      <h1 className="pl-3">{`${patient.name.firstName} `}</h1>
                      <h1 className="pl-1">{`${patient.name.middleName} `}</h1>
                      <h1 className="pl-1">{patient.name.surName}</h1>
                    </div>
                  </div>
                  <div className="flex">
                    <div>
                      <h1>Date : </h1>
                    </div>
                    <div className="ml-2">
                      <h1>{dob}</h1>
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
                    <div>{`${patient.diseases[0].disease} (${patient.diseases[0].yrs} yrs.)`}</div>
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
                        <h1>{`Dr. ${prescriptions[0].doctor}`}</h1>
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <h1>Date :</h1>
                      </div>
                      <div className="ml-2">
                        <h1>
                          {convertDatetoString(prescriptions[0].createdAt)}
                        </h1>
                      </div>
                    </div>
                    <div className="flex">
                      <div>
                        <h1>Diagnosis : </h1>
                      </div>
                      <div className="ml-2">
                        <h1>{prescriptions[0].diagnosis}</h1>
                      </div>
                    </div>
                    <Link
                      to="/doctor/prescription"
                      onClick={() => {
                        props.setPrescriptionID(prescriptions[0]._id);
                      }}
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
                {/* recent health check up end */}
              </div>
              <div></div>
            </div>
          ) : (
            <div className="text-xl justify-center items-center font-bold border">
           <Dashboard/>
            </div>
          )}

          {/* Patient Dashboard */}
          {Object.keys(patient).length !== 0 ? (
            <div className="font-poppins m-4  ">
              <div className="flex justify-between m-8">
                <div className="font-bold text-xl ml-2">
                  <h1>Patient Reports</h1>
                  <div>
      <Button onClick={handleOpen}>Uploaded Reports</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Hardcopy Uploaded Reports</DialogTitle>
        <DialogContent dividers>
          <div style={{ margin: "0 auto" }}>
            <Typography variant="h3" sx={{ fontWeight: "500", paddingBottom: "1.5rem" }}>Hardcopy Uploaded Reports</Typography>
            <TableContainer component={Paper} style={{ overflow: 'auto' }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#eee" }}>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="justify">File</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {files.map((report, index) => (
                    <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell align="left">{report.description}</TableCell>
                      <TableCell align="center">{report.date}</TableCell>
                      <TableCell align="justify">
                        {report.url ? (
                          <a href={report.url} style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '4px 8px', color: '#007bff', textDecoration: 'none', backgroundColor: '#f0f0f0' }} target="_blank" rel="noopener noreferrer">{`file${index + 1}`}</a>
                        ) : (
                          `file${index + 1}`
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
                </div>
                <Link to="/doctor/addDiagno">
                  <div className=" flex  bg-primary pl-0 pr-3 py-1 items-center justify-items-center  rounded font-semibold font-poppins shadow-sm hover:bg-bgsecondary   ">
                    <img
                      src={add_pre_logo}
                      className="h-3 mx-3"
                      alt="adddiagno"
                    ></img>

                    <button className="font-semibold">Add New Diagnosis</button>
                  </div>
                </Link>
              </div>
              <div className="bg-white m-4 rounded-lg ">
                <div className="grid grid-rows-2 p-6 gap-2 shadow">
                  <div className="grid grid-cols-4 font-bold  border-b-2">
                    <div>
                      <h1>Date</h1>
                    </div>
                    <div>
                      <h1>Doctor Name</h1>
                    </div>
                    <div>
                      <h1>Diagnosis</h1>
                    </div>
                    <div>
                      <h1>Prescription</h1>
                    </div>
                  </div>

                  {prescriptions.length > 0 ? (
                    prescriptions.slice(0, 3).map((prescription, index) => {
                      return (
                        <div className="grid grid-cols-4" key={index}>
                          <div>
                            <h1>
                              {convertDatetoString(prescription.createdAt)}
                            </h1>
                          </div>
                          <div className="flex">
                            <h1>Dr. </h1>
                            <h1>{prescription.doctor}</h1>
                          </div>
                          <div>
                            <h1>{prescription.diagnosis}</h1>
                          </div>
                          <Link
                            to="/doctor/prescription"
                            onClick={() =>
                              props.setPrescriptionID(prescription._id)
                            }
                          >
                            <div className=" flex  justify-center bg-primary py-1 px-3 rounded font-semibold font-poppins shadow-sm hover:bg-bgsecondary w-2/5   ">
                              <img
                                src={eye}
                                className="h-4 my-auto"
                                alt="preview"
                              ></img>
                              <button className="font-bold ml-2">
                                Preview{" "}
                              </button>
                            </div>
                          </Link>
                        </div>
                      );
                    })
                  ) : (
                    <div className="mx-auto mt-3">No Records Found...</div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      <div className="mt-16 mb-0">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default DoctorDashboard;
