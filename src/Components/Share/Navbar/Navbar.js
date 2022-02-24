import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const Navbar = () => {
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
            <Link to="/">Features</Link>
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

                <Link className={navItem} to="/">
                  <Button color="inherit">Features</Button>
                </Link>
                <NavLink className={navItem} to="/dashboard">
                  <Button className="btn_regular" color="inherit">
                    Dashboard
                  </Button>
                </NavLink>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
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
    </>
  );
};

export default Navbar;
