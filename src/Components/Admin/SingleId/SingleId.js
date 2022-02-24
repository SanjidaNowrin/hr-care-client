import {useRef} from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import "./SingleId.css";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
const SingleId = ({ employeeId }) => {
  const { name, department, designation, phone } = employeeId;
  const pdfExportComponent=useRef(null);
  const handleOnclick = () => {
    pdfExportComponent.current.save();
   
  };
  return (
     
    <Grid item xs={12} sm={12} md={4}>
     <PDFExport ref={pdfExportComponent}>
      <div className="card" id="idCards">
        <div className="upper-content">
          <h4 className="upper-title">Hr Care</h4>
          <div className="img-container">
            <img
              src="https://i.ibb.co/DGPYn0C/person.jpg"
              alt=""
              height="100px"
              width="100px"
            />
          </div>
        </div>
        <div className="lower-content">
          <h4>{name}</h4>
          <p style={{ fontSize: "14px" }}>{department}</p>
        </div>
        <div className="bottom-content-id">
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <h5>ID NO</h5>
              <p>S-15012</p>
              <h5>D.O.B</h5>
              <p>22/4/2021</p>
            </Grid>
            <Grid item xs={4}>
              <h5>Joined Date</h5>
              <p>22/06/2021</p>
              <h5>Designation</h5>
              <p>{designation}</p>
            </Grid>
            <Grid item xs={4}>
              <h5>Phone</h5>
              <p>{phone}</p>
              <h5>B Group</h5>
              <p>B+</p>
            </Grid>
          </Grid>
        </div>
        <div className="qr-area">
          <h4 className="qr">QR Code</h4>
          <img
            width="100%"
            src="https://i.ibb.co/fxLKH5h/qr-code-g151cf237e-1280.png"
            alt=""
          />
        </div>
      </div>
      </PDFExport>
      <div className="form-button">
        <Button
          className="btn_regular"
          onClick={() => handleOnclick()}
          variant="contained"
        >
          Download PDF
        </Button>
      </div>
    </Grid>
    
  );
};
export default SingleId;
