import React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import useAuth from "../../../hooks/useAuth";
import './SingleId.css'

const SingleId = ({employeeId}) => {
    const { user } = useAuth();
    const handleOnclick = () =>{
       console.log("clicked")
    }
    return (
        <Grid item xs={12} sm={12} md={4}>
            <div className="card" id="idCards">
                    <div className="upper-content">
                            <h4 className="upper-title">HR CARE</h4>
                        <div className="img-container">
                            <img src={user.photoURL} alt="" height="100px" width="100px" />
                        </div>
                    </div>
                    <div className="lower-content">
                        <h4>{employeeId.name}</h4>
                        <p style={{fontSize: "14px"}}>{employeeId.department}</p>
                    </div>
                    <div className="bottom-content-id">
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <h5>ID NO</h5>
                                <p>{employeeId.ID}</p>
                                <h5>D.O.B</h5>
                                <p>{employeeId.birth}</p>
                            </Grid>
                            <Grid item xs={4}>
                                <h5>Joined Date</h5>
                                <p>22/06/2021</p>
                                <h5>Designation</h5>
                                <p>{employeeId.designation}</p>
                            </Grid>
                            <Grid item xs={4}>
                                <h5>Phone</h5>
                                <p>{employeeId.phone}</p>
                                <h5>B Group</h5>
                                <p>B+</p>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="signiture-area">
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                               <div className="employee-signiture">
                                   <div className="e-signiture">

                                   </div>
                                   <h5>Employee</h5>
                               </div>
                            </Grid>
                            <Grid item xs={6}>
                               <div className="director-signiture">
                                    <div className="d-signiture">
                                        <img width={"100%"} src="https://i.ibb.co/r5GjMHf/output-onlinepngtools.png" alt="" />
                                    </div>
                                    <h5>Director</h5>
                               </div>
                            </Grid>
                        </Grid>
                    </div>
                    <div className="card-bottom">
                        <h5>www.hr-care.com</h5>
                    </div>
                </div>
                <div className="form-button">
                    <Button className="btn_regular" onClick={() => handleOnclick()} variant="contained">Download PDF</Button>
                </div>
        </Grid>
    );
};
export default SingleId;