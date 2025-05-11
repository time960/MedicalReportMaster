import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import eye from '../../assets/img/dashboard/eye.png'
const apiUrl = 'https://medical-record-rxyo.onrender.com';

export default function DoctorReports(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [prescriptions, setPrescriptions] = useState(null);

    useState(() => {
        const fetchReports = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${apiUrl}/doctor-reports`, {
                    withCredentials: true,
                    credentials: 'include'
                });
                console.log('Doctor Reports:', response.data);
                setPrescriptions(response.data.prescriptions.reverse());
            } catch (err) {
                console.log(err)
                if (err.response && err.response.status === 401) {
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
        }

        fetchReports();
    }, [])

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

    if (loading) {
        return (
            <div className="doctor-reports col-span-10 pt-10">
                <div style={{ width: '90%', margin: '0 auto'}}>
                    <Typography variant="h5" sx={{ fontWeight: "500" }} gutterBottom>
                        Loading Table...
                    </Typography>
                </div>
            </div>
        );
    }

    if (prescriptions === null || prescriptions.length === 0) {
        return (
            <div className="doctor-reports col-span-10 pt-12">
                <div style={{ width: '90%', margin: '0 auto'}}>
                    <Typography variant="h4" sx={{ fontWeight: "500" }} gutterBottom>
                        No Reports Found!!
                    </Typography>
                </div>
            </div>
        );
    }

    return (
        <div className="doctor-reports col-span-10 pt-10" style={{ backgroundColor: '#eee', overflow: 'scroll'}}>
            <div style={{ width: '90%', margin: '0 auto' }}>
                <Typography
                    variant="h4"
                    sx={{ fontWeight: "600" }}
                >
                    Reports
                </Typography>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: '600', color: 'gray' }}>
                    Preview of the reports will be shown here.
                </Typography>

                <div className="report-table pt-8">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontSize: '1.2rem', fontWeight: '600' }}>Name</TableCell>
                                    <TableCell align="right" sx={{ fontSize: '1.2rem', fontWeight: '600' }}>Diagnosis</TableCell>
                                    <TableCell align="right" sx={{ fontSize: '1.2rem', fontWeight: '600' }}>Procedure conducted</TableCell>
                                    <TableCell align="right" sx={{ fontSize: '1.2rem', fontWeight: '600' }}>Hospital</TableCell>
                                    <TableCell align="right" sx={{ fontSize: '1.2rem', fontWeight: '600' }}>Date</TableCell>
                                    <TableCell align="right" sx={{ fontSize: '1.2rem', fontWeight: '600' }}>Preview</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {prescriptions.map((prescription, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 }, }}
                                    >
                                        <TableCell component="th" scope="prescription" sx={{ fontSize: '1.1rem' }}>
                                            {prescription.patientName}
                                        </TableCell>
                                        <TableCell align="right" sx={{ fontSize: '1.1rem' }}>{prescription.diagnosis}</TableCell>
                                        <TableCell align="right" sx={{ fontSize: '1.1rem' }}>{prescription.procedureConducted
                                        }</TableCell>
                                        <TableCell align="right" sx={{ fontSize: '1.1rem' }}>{ prescription.hospital ? prescription.hospital.name : 'Abc Hospital' }</TableCell>
                                        <TableCell align="right" sx={{ fontSize: '1.1rem' }}>{formatDate(prescription.updatedAt)}</TableCell>
                                        <TableCell align="right" sx={{ fontSize: '1.1rem' }}>
                                            <Link to={`/doctor/prescription`} className="btn btn-primary"
                                                onClick={() => { 
                                                    props.setPrescriptionID(prescription._id); 
                                                    
                                                    props.setDoctorView(true);
                                                }}
                                            >
                                                Preview
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

            </div>
        </div>
    )
}