import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Toolbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Menu from "@mui/material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import useAuth from "../../../hooks/useAuth";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import PropTypes from "prop-types";

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

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const Navbar = (props) => {
  const { user, logOut } = useAuth();
  const [state, setState] = React.useState(false);
  const theme = useTheme();
  const useStyle = makeStyles({
    navContainer: {
      background: "#fff !important",
      boxShadow: "0px 8px 25px rgba(0, 0, 0, .1) !important",
    },
    navItem: {
      color: "#000",
      textDecoration: "none",
    },
    navIcon: {
      [theme.breakpoints.up("sm")]: {
        display: "none !important",
      },
    },
    navItemContainer: {
      marginLeft: "auto",
      [theme.breakpoints.down("sm")]: {
        display: "none !important",
      },
    },
    mobileNavItem: {
      transition: "all .3s !important",
      "&:hover": {
        boxShadow: "0px 8px 15px rgba(0, 0, 0, .2) !important",
      },
    },
  });
  const { navItem, navIcon, navItemContainer, mobileNavItem, navContainer } =
    useStyle();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // drawer item
  const list = (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        <ListItem className={mobileNavItem} button>
          <ListItemText>
            <Link to="/home">Home</Link>
          </ListItemText>
        </ListItem>

        <Divider />
        <ListItem className={mobileNavItem} button>
          <ListItemText>
            <Link to="/about">About Us</Link>
          </ListItemText>
        </ListItem>

        <Divider />

        <ListItem button>
          <ListItemText>
            <Link className="btn_regular" to="/dashboard">
              Dashboard
            </Link>
          </ListItemText>
        </ListItem>
      </List>
    </Box>
  );

  const [employee, setEmployee] = useState([]);
  // get data
  useEffect(() => {
    fetch(`https://ancient-thicket-61342.herokuapp.com/employees/photo/${user.email}`)
      .then((res) => res.json())
      .then((data) => setEmployee(data.result));
  }, [user.email, employee]);

  return (
    <>
      {/* main navigation */}
      <Box sx={{ flexGrow: 1 }}>
        <HideOnScroll {...props}>
          <AppBar className={navContainer}>
            <Container>
              <Toolbar>
                <Link className={navItem} to="/">
                  <img
                    src="https://i.ibb.co/MkzYpxC/hr-care-logo.png"
                    alt="hr care"
                    style={{ width: "100%" }}
                  />
                </Link>
                <IconButton
                  className={navIcon}
                  onClick={() => setState(true)}
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ marginLeft: "auto" }}
                >
                  <MenuIcon sx={{ color: "var(--p_color)" }} />
                </IconButton>
                <Box className={navItemContainer}>
                  <Link className={navItem} to="/home">
                    <Button color="inherit">Home</Button>
                  </Link>

                  <Link className={navItem} to="/about">
                    <Button sx={{ mr: 1 }} color="inherit">
                      About Us
                    </Button>
                  </Link>
                  <NavLink className={navItem} to="/dashboard">
                    <Button className="btn_regular" color="inherit">
                      Dashboard
                    </Button>
                  </NavLink>

                  <NavLink className={navItem} to="/">
                    {user.email ? (
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
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            variant="dot"
                          >
                            {employee[0]?.photo ? (
                              employee.map((employeePhoto) => (
                                <Avatar
                                  alt="Remy Sharp"
                                  src={`data:image/jpeg;base64,${employeePhoto?.photo}`}
                                />
                              ))
                            ) : (
                              <Avatar
                                sx={{ bgcolor: "var(--s_color)" }}
                                alt="Remy Sharp"
                                src="/broken-image.jpg"
                              >
                                {user.displayName.slice(0, 1)}
                              </Avatar>
                            )}
                          </StyledBadge>
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <NavLink className={navItem} to="/login">
                        <Button color="inherit">Login</Button>
                      </NavLink>
                    )}
                  </NavLink>
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
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      <Button
                        sx={{ color: "black", padding: "0" }}
                        onClick={logOut}
                      >
                        Logout
                      </Button>
                    </MenuItem>
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </HideOnScroll>
      </Box>

      {/* responsive drawer */}
      <>
        <React.Fragment>
          <Drawer open={state} anchor="right" onClose={() => setState(false)}>
            <Box sx={{ background: "var(--p_color) !important" }}>
              <Link to="/">
                <img
                  src="https://i.ibb.co/MkzYpxC/hr-care-logo.png"
                  alt="hr care"
                  style={{ width: "100%" }}
                />
              </Link>
            </Box>

            {/* responsive drawer */}
            <>
              <React.Fragment>
                <Drawer
                  open={state}
                  anchor="right"
                  onClose={() => setState(false)}
                >
                  <Box sx={{ background: "#fff" }}>
                    <Link to="/">
                      <img
                        src="https://i.ibb.co/MkzYpxC/hr-care-logo.png"
                        alt="hr care"
                        style={{ width: "100%" }}
                      />
                    </Link>
                  </Box>
                  {list}
                  <Box sx={{ textAlign: 'center' }}>
                    <NavLink className={navItem} to="/">
                      {user.email ? (
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
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                              }}
                              variant="dot"
                            >
                              {employee[0]?.photo ? (
                                employee.map((employeePhoto) => (
                                  <Avatar
                                    alt="Remy Sharp"
                                    src={`data:image/jpeg;base64,${employeePhoto?.photo}`}
                                  />
                                ))
                              ) : (
                                <Avatar
                                  sx={{ bgcolor: "var(--s_color)" }}
                                  alt="Remy Sharp"
                                  src="/broken-image.jpg"
                                >
                                  {user.displayName.slice(0, 1)}
                                </Avatar>
                              )}
                            </StyledBadge>
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <NavLink className={navItem} to="/login">
                          <Button color="inherit">Login</Button>
                        </NavLink>
                      )}
                    </NavLink>
                  </Box>
                </Drawer>
              </React.Fragment>
            </>
          </Drawer>
        </React.Fragment>
      </>
    </>
  );
};

export default Navbar;
