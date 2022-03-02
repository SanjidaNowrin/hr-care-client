import { useRef } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Swal from 'sweetalert2'
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { makeStyles } from "@mui/styles";
import { Box, Divider, Paper, Typography } from "@mui/material";
import useAuth from "../../../hooks/useAuth";


const SingleId = ({ employeeId }) => {
    const { user } = useAuth();
    const { ID, name, department, designation, phone } = employeeId;

    const pdfExportComponent = useRef(null);
    const handleOnclick = () => {
        pdfExportComponent.current.save();

        Swal.fire(
            'Good job!',
            'ID Card Downloaded Successfully!',
            'success'
        )

    };

    const useStyle = makeStyles({
        cardBox: {
            overflow: 'hidden',
            transition: 'all .3s ease',
            "&:hover": {
                boxShadow: '1px 10px 30px #b6b7b7 !important'
            },
        },
        cardTop: {
            background: 'var(--p_color)',
            height: '110px',
            paddingTop: '10px'
        },
        imgBox: {
            textAlign: 'center',
            margin: '0 auto',
            borderRadius: '50%',
            position: 'relative',
            top: '-53px',
            height: '110px',
            width: '110px',
        },
        imgTop: {
            width: '100%',
            borderRadius: '50%',
            border: '6px solid #fff',
        },
        textBold: {
            fontWeight: '700 !important'
        },
        signatureImg: {
            width: '60px'
        }
    })

    const { cardBox, cardTop, imgBox, imgTop, textBold, signatureImg } = useStyle();

    return (
        <Grid item xs={12} sm={12} md={4}>
            <PDFExport ref={pdfExportComponent}>
                <Paper className={cardBox}>
                    <Box className={cardTop}>
                        <Typography sx={{ textAlign: 'center', color: '#fff', textTransform: 'uppercase' }} variant="h4">HR Care</Typography>
                    </Box>

                    {/* employee image */}
                    <Box className={imgBox}>
                        <img
                            src={user.photoURL}
                            alt=""
                            className={imgTop}
                        />
                    </Box>

                    <Box sx={{ textAlign: 'center', marginTop: '-53px' }}>
                        <Typography sx={{ textShadow: '2px 2px 9px #969696' }} variant="h5">{name}</Typography>
                        <Typography sx={{ color: '#845EC2', textShadow: '2px 2px 9px #969696' }} variant="body1">{department}</Typography>
                    </Box>

                    {/* body content */}
                    <Box sx={{ px: 2 }}>
                        <Grid sx={{ mt: 1 }} container spacing={1}>
                            <Grid item xs={4}>
                                <Typography className={textBold} variant="body2">ID NO</Typography>
                                <Typography variant="body2">{name.slice(0, 1)}#{ID}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography className={textBold} variant="body2">Phone</Typography>
                                <Typography variant="body2">{phone}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography className={textBold} variant="body2">Joined Date</Typography>
                                <Typography variant="body2">22/06/2021</Typography>
                            </Grid>
                        </Grid>

                        <Grid sx={{ marginTop: '5px' }} container spacing={1}>
                            <Grid item xs={4}>
                                <Typography className={textBold} variant="body2">D.O.B</Typography>
                                <Typography variant="body2">22/4/2021</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography className={textBold} variant="body2">Designation</Typography>
                                <Typography variant="body2">{designation}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography className={textBold} variant="body2">Blood Group</Typography>
                                <Typography variant="body2">B+</Typography>
                            </Grid>
                        </Grid>
                    </Box>

                    <Divider sx={{ my: 2 }} variant="middle" />

                    {/* signature box */}
                    <Box sx={{ px: 2, pt: 1, pb: 2 }}>
                        <Grid container spacing={10}>
                            <Grid item xs={6}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <img
                                        className={signatureImg}
                                        src="https://signaturely.com/wp-content/uploads/2020/04/mark-cuban-signature-signaturely-image.png"
                                        alt="signature"
                                    />
                                </Box>

                                <Divider />
                                <Typography sx={{ textAlign: 'center' }} variant="body1">Employee</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <img
                                        className={signatureImg}
                                        src="https://www.seoclerk.com/pics/211935-1qeWBB1398605222.jpg"
                                        alt="signature"
                                    />
                                </Box>
                                <Divider />
                                <Typography sx={{ textAlign: 'center' }} variant="body1">Director</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </PDFExport>
            <Box sx={{ textAlign: 'center', my: 1 }}>
                <Button
                    className="btn_regular"
                    onClick={() => handleOnclick()}
                    variant="contained"
                    sx={{ padding: '6px 50px 5px !important' }}
                >
                    Download PDF
                </Button>
            </Box>
        </Grid >

    );
};
export default SingleId;
