import Footer from "../landingPage/Footer";
import patient_profile from "../../assets/img/dashboard/patient2_pbl.png";
import PatientReportCompo from "./PatientReportCompo";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
const apiUrl = "https://medical-record-rxyo.onrender.com";


const PatientReports = (props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPatient = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`${apiUrl}/getpatient`, {
          withCredentials: true,
          credential: 'include',
        })
        console.log(response.data)
        setToken(response.data.patient.healthID)
      } catch (err) {
        console.log(err)
        if (err.response && err.response.status === 401) {
          setLoading(false)
          props.settoastCondition({
            status: "info",
            message: "Please Login to proceed!!!",
          });
          props.setToastShow(true);
          navigate("/");
        }
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    getPatient()
  }, [])

  const resetToken = async () => {
    try {
      setLoading(true)
      const response = await axios.put(`${apiUrl}/reset-token`, {}, {
        withCredentials: true,
        credential: 'include',
      })
      setToken(response.data.patient.healthID)
    } catch (err) {
      console.log(err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(token);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (loading) {
    return (
      <div className="col-span-10">
        <div className="pt-14 px-9">
          <Typography variant="h4" component="div">
            Showing Token...
          </Typography>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="col-span-10">
        <div className="pt-14 px-9">
          <Typography variant="h4" component="div">
            {error}
          </Typography>
        </div>
      </div>
    )
  }

  return (
    <div className="col-span-10" style={{ display: 'grid', gridTemplateRows: '1fr auto', backgroundColor: '#eee' }}>
      <div className="pt-14 px-9" style={{}}>
        <Card sx={{ minWidth: 275 }} variant="outlined">
          <CardContent>
            <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
              Current Access Token
            </Typography>
            <Typography variant="h3" component="div">
              {token}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Only share this token with your doctor
            </Typography>
            <div style={{ paddingTop: '.8rem', display: 'flex', gap: '1rem' }}>
              <Button size="medium" variant="outlined" onClick={resetToken}>Reset</Button>
              <Button size="medium" variant="outlined" onClick={copyToClipboard}>Copy</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default PatientReports;
