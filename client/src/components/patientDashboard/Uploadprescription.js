import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from "../landingPage/Footer";
import patient_profile from "../../assets/img/dashboard/patient2_pbl.png";
import PatientReportCompo from "./PatientReportCompo";
import { Link, useNavigate } from "react-router-dom";
import { Typography,FormControl, FormLabel,TextField ,Button} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
function App(props) {
  const [formData, setFormData] = useState({
    description: '',
    date: '',
    file: null
  });
  const [files, setFiles] = useState([]);

  // Fetch available files on initial load
  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
       
      const response = await axios.get('https://medical-record-rxyo.onrender.com/files',{withCredentials:true,credential: 'include'}); // Adjust the endpoint as per your server route
      console.log(response)
      setFiles(response.data.files);
    } catch (error) {
      console.error('Error fetching files', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    formDataObj.append('patient', formData.patient);
    formDataObj.append('description', formData.description);
    formDataObj.append('date', formData.date);
    formDataObj.append('file', formData.file);

    try {
      await axios.post('https://medical-record-rxyo.onrender.com/upload', formDataObj, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
         withCredentials: true,
        credentials: "include",
        crossDomain: true,
      },);
      setFormData({
        patient: '',
        description: '',
        date: '',
        file: null
      });
      fetchFiles(); // Refresh the files after upload
    } catch (error) {
      console.error('Error uploading file', error);
    }
  };
  if(files.length == 0) {
    return (
      <div
        className="patient-medicine col-span-10"
        style={{ padding: "5rem 4rem", width: "100%" }}
      >
        <Typography variant="h5" sx={{ fontWeight: "500" }} gutterBottom>
         Upload Files
        </Typography>
      </div>
    );
  }

  return (
    // <div className="container">
    //   <h1 className="title">Upload File Form</h1>
    //   <div className="files-container">
    //     {files.length > 0 ? (
    //       <table className="files-table">
    //         <thead>
    //           <tr>
    //             <th>Description</th>
    //             <th>Date</th>
    //             <th>File URL</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {files.map((file, index) => (
    //             <tr key={index}>
    //               <td>{file.description}</td>
    //               <td>{file.date}</td>
    //               <td><a href={file.url} target="_blank" rel="noopener noreferrer">{file.url}</a></td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     ) : (
    //       <p className="no-files">No files available. Upload your files.</p>
    //     )}
    //   </div>
    //   <div className="upload-form">
    //     <h2>Upload File</h2>
    //     <form onSubmit={handleSubmit}>
    //       <div className="form-group">
    //         <label>Patient:</label>
    //         <input
    //           type="text"
    //           name="patient"
    //           value={formData.patient}
    //           onChange={handleChange}
    //           className="form-input"
    //         />
    //       </div>
    //       <div className="form-group">
    //         <label>Description:</label>
    //         <input
    //           type="text"
    //           name="description"
    //           value={formData.description}
    //           onChange={handleChange}
    //           className="form-input"
    //         />
    //       </div>
    //       <div className="form-group">
    //         <label>Date:</label>
    //         <input
    //           type="date"
    //           name="date"
    //           value={formData.date}
    //           onChange={handleChange}
    //           className="form-input"
    //         />
    //       </div>
    //       <div className="form-group">
    //         <label>Upload File:</label>
    //         <input
    //           type="file"
    //           accept=".pdf"
    //           name="file"
    //           onChange={handleFileChange}
    //           className="form-input"
    //         />
    //       </div>
    //       <button type="submit" className="upload-button">Upload</button>
    //     </form>
    //   </div>
    // </div>
    <div
      className="patient-medicine col-span-10"
      style={{ padding: "3rem 4rem", width: "100%"}}
    >
      <div style={{ margin: "0 auto" }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: "500", paddingBottom: "1.5rem" }}
        >
         Hardcopy Uploaded Reports
        </Typography>
        <TableContainer component={Paper} style={{ overflow: 'auto'}}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "#eee" }}>
                <TableCell align="left">Description</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="justify">File</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {files.map((medicine, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{medicine.description}</TableCell>
                  <TableCell align="center">{medicine.date}</TableCell>
                  <TableCell align="justify">
  {medicine.url ? (
    <a href={medicine.url} style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '4px 8px', color: '#007bff', textDecoration: 'none', backgroundColor: '#f0f0f0' }} target="_blank" rel="noopener noreferrer">{`file${index + 1}`}</a>
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
       <form onSubmit={handleSubmit} style={{ marginTop:'5rem'}}>
        <FormControl fullWidth>
        <TextField
          name="description"
          label="Description"
          variant="outlined"
          value={formData.description}
          onChange={handleChange}
          style={{ marginBottom: '1rem' }}
        />
        <TextField
          name="date"
          label="Date"
          type="date"
          variant="outlined"
          value={formData.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          style={{ marginBottom: '1rem' }}
        />
        <input
          type="file"
          name="file"
          accept=".pdf"
          onChange={handleFileChange}
          style={{ marginBottom: '1rem' }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
        >
          Upload Prescription
        </Button>
      </FormControl>
      </form>
    </div>
  );
}

export default App;
