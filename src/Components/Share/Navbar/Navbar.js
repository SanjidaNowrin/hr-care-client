import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
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
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import useAuth from "../../../hooks/useAuth";

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

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [state, setState] = React.useState(false);
  const theme = useTheme();
  const useStyle = makeStyles({
    navContainer: {
      background: "#01578A !important",
    },
    navItem: {
      color: "white",
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
    navLogo: {
      [theme.breakpoints.down("sm")]: {
        textAlign: "right",
      },
    },
    mobileNavItem: {
      transition: "all .3s !important",
      "&:hover": {
        boxShadow: "0px 8px 15px rgba(248, 80, 80, .5) !important",
      },
    },
  });
  const {
    navItem,
    navIcon,
    navItemContainer,
    navLogo,
    mobileNavItem,
    navContainer,
  } = useStyle();

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
            <Link to="/teams">Teams</Link>
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

  return (
    <>
      {/* main navigation */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar className={navContainer} position="static">
          <Container>
            <Toolbar>
              <Link className={navItem} to="/">
                <div className="navbarlogo">
                  <img
                    src="https://i.ibb.co/GxkQtD9/hrcare-logo.png"
                    alt=""
                    className="logo"
                  />
                  <Typography
                    className={navLogo}
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 2, marginLeft: "9px" }}
                  >
                    HR CARE
                  </Typography>
                </div>
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
                <MenuIcon />
              </IconButton>
              <Box className={navItemContainer}>
                <Link className={navItem} to="/home">
                  <Button color="inherit">Home</Button>
                </Link>

                <Link className={navItem} to="/teams">
                  <Button color="inherit">Team</Button>
                </Link>
                <NavLink className={navItem} to="/dashboard">
                  <Button className="btn_regular" color="inherit">
                    Dashboard
                  </Button>
                </NavLink>

                <NavLink className={navItem} to="/">
                  {
                    user.email ?
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
                            <Avatar alt="Remy Sharp" src={user.photoURL} />
                          </StyledBadge>
                        </IconButton>
                      </Tooltip>
                      :
                      <NavLink className={navItem} to="/login">
                        <Button color="inherit">
                          Login
                        </Button>
                      </NavLink>
                  }
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
                    <Avatar />
                    My Profile
                  </MenuItem>
                  <Divider />
                  <MenuItem>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    <Button sx={{ color: "black", padding: "0" }} onClick={logOut}>
                      Logout
                    </Button>
                  </MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      {/* responsive drawer */}
      <>
        <React.Fragment>
          <Drawer open={state} anchor="right" onClose={() => setState(false)}>
            <Box sx={{ background: "#01578A !important" }}>
              <Link className={navItem} to="/">
                <Typography variant="h5" sx={{ textAlign: "center", my: 2 }}>
                  HR CARE
                </Typography>
              </Link>
            </Box>

            {/* responsive drawer */}
            <>
              <React.Fragment>
                <Drawer open={state} anchor="right" onClose={() => setState(false)}>
                  <Box sx={{ background: "#009EFA" }}>
                    <Link className={navItem} to="/">
                      <Typography variant="h5" sx={{ textAlign: "center", my: 2 }}>
                        HR CARE
                      </Typography>
                    </Link>
                  </Box>
                  {list}
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
