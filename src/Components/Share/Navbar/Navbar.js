import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const Navbar = () => {
    const theme = useTheme();
    const useStyle = makeStyles({
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
            textDecoration: "none",
            color: "white",
        },
        navContainer: {
            backgroundImage: "linear-gradient(to right, #845ec2, #af5dbb, #d15eaf, #ec64a0, #ff6f91)",
        },
    });
    const [state, setState] = React.useState(false);

    const { navItem, navIcon, navItemContainer, navLogo, mobileNavItem, navContainer } = useStyle();

    const list = (
        <Box sx={{ width: 250 }} role="presentation">
            <List className={navContainer}>
                <ListItem button>
                    <ListItemText>
                        <Link className={mobileNavItem} to="/home">
                            Home
                        </Link>
                    </ListItemText>
                </ListItem>

                <Divider />
                <ListItem button>
                    <ListItemText>
                        <Link className={mobileNavItem} to="/home">
                            Features
                        </Link>
                    </ListItemText>
                </ListItem>

                <Divider />
                <ListItem button>
                    <ListItemText>
                        <Link className={mobileNavItem} to="/home">
                            Team
                        </Link>
                    </ListItemText>
                </ListItem>

                <Divider />
                <ListItem button>
                    <ListItemText>
                        <Link className={mobileNavItem} to="/home">
                            Blog
                        </Link>
                    </ListItemText>
                </ListItem>

                <Divider />

                <ListItem button>
                    <ListItemText>
                        <Link className={mobileNavItem} to="/about">
                            About
                        </Link>
                    </ListItemText>
                </ListItem>

                <Divider />

                <ListItem button>
                    <ListItemText>
                        <Link className={mobileNavItem} to="/dashboard">
                            Live Preview
                        </Link>
                    </ListItemText>
                </ListItem>
            </List>
        </Box>
    );
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar className={navContainer} position="static">
                    <Container>
                        <Toolbar>
                            <IconButton
                                className={navIcon}
                                onClick={() => setState(true)}
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography className={navLogo} variant="h6" component="div" sx={{ flexGrow: 2 }}>
                                HR CARE
                            </Typography>
                            <Box className={navItemContainer}>
                                <Link className={navItem} to="/home">
                                    <Button color="inherit">Home</Button>
                                </Link>

                                <Link className={navItem} to="/">
                                    <Button color="inherit">Features</Button>
                                </Link>

                                <Link className={navItem} to="/">
                                    <Button color="inherit">Team</Button>
                                </Link>

                                <Link className={navItem} to="/">
                                    <Button color="inherit">Blog</Button>
                                </Link>

                                <Link className={navItem} to="/">
                                    <Button color="inherit">About</Button>
                                </Link>

                                <NavLink className={navItem} to="/">
                                    <Button className="btn_regular" color="inherit">
                                        Live Preview
                                    </Button>
                                </NavLink>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box>
            <div>
                <React.Fragment>
                    <Drawer open={state} onClose={() => setState(false)}>
                        {list}
                    </Drawer>
                </React.Fragment>
            </div>
        </>
    );
};

export default Navbar;
