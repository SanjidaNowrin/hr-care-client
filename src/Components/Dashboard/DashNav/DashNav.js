import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import useAuth from "./../../../hooks/useAuth";
import { Button, Typography } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';

import { Input } from "@mui/material";
import Modal from "@mui/material/Modal";
import EventIcon from "@mui/icons-material/Event";
import LinkedCameraIcon from "@mui/icons-material/LinkedCamera";
import HolidayCalendar from "./HolidayCalender/HolidayCalender";
import LogoutIcon from "@mui/icons-material/Logout";
import Notification from "./Notification/Notification";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 850,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const styleImage = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const DashNav = () => {
  const [photo, setPhoto] = useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { logOut, user } = useAuth();

  const [start, setOpen] = React.useState(false);
  const [employee, setEmployee] = useState([]);
  const [photoURL, setPhotoUrl] = useState(true);
  const handleOpen = () => setOpen(true);
  const close = () => setOpen(false);
  // calendar modal
  const [holiday, setHoliday] = React.useState(false);
  const holidayOpen = () => setHoliday(true);
  const holidayClose = () => setHoliday(false);
  // get data
  useEffect(() => {
    fetch(`https://ancient-thicket-61342.herokuapp.com/employees/${user.email}`)
      .then((res) => res.json())
      .then((data) => setEmployee(data.result));
  }, [photoURL, user.email, employee]);
  //form submit
  const handleSubmit = (e) => {
    const formData = new FormData();
    formData.append("photo", photo);
    fetch(`https://ancient-thicket-61342.herokuapp.com/employees/profile/${user.email}`, {
      method: "PUT",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
        setPhotoUrl(!photoURL);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    e.preventDefault();
    close();
  };

  const theme = useTheme();
  const useStyle = makeStyles({
    lineBr: {
      display: 'none',
      [theme.breakpoints.down("md")]: {
        display: "block !important",
      },
    }
  })

  const { lineBr } = useStyle();

  return (
    <>
      <React.Fragment>
        <Typography sx={{ color: "black" }} variant='h5'>
          Welcome! <br className={lineBr} /> {user.displayName}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            textAlign: "center",
            marginLeft: "auto",
          }}
        >
          <Box sx={{ display: "flex" }}>
            {/* Notification */}
            <Notification></Notification>

            {/* calender */}
            <IconButton sx={{ background: 'transparent' }} size="large" color="inherit">
              <Badge color="error">
                <EventIcon sx={{ color: 'var(--p_color)' }} onClick={holidayOpen} />
              </Badge>
            </IconButton>
          </Box>
          {/* calender modal */}
          <Modal
            open={holiday}
            onClose={holidayClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <HolidayCalendar />
            </Box>
          </Modal>
          {/* calender modal end*/}

          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                {employee[0]?.photo ? (
                  employee.map((employeePhoto) => (
                    <Avatar
                      key={employeePhoto?.photo}
                      alt="Employee Photo"
                      src={`data:image/jpeg;base64,${employeePhoto?.photo}`}
                    />
                  ))
                ) : (
                  <Avatar
                    sx={{ bgcolor: 'var(--s_color)' }}
                    alt="Employee Photo"
                    src="https://i.ibb.co/gvzdw1g/images.png"
                  >
                    {user.displayName.slice(0, 1)}
                  </Avatar>
                )}
              </StyledBadge>
            </IconButton>
          </Tooltip>
        </Box>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <ListItemIcon>
              <LinkedCameraIcon />
            </ListItemIcon>
            <Button sx={{ color: "black", padding: "0" }} onClick={handleOpen}>
              Change Picture
            </Button>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <Button sx={{ color: "black", padding: "0" }} onClick={logOut}>
              Logout
            </Button>
          </MenuItem>
        </Menu>
      </React.Fragment>
      {/* modal */}
      <Modal
        open={start}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleImage}>
          <form onSubmit={handleSubmit}>
            <Input
              accept="image/*"
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
            ></Input>
            <Button
              sx={{ marginTop: "10px" }}
              className="btn_regular"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default DashNav;