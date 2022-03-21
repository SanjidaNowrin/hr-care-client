import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { Link } from 'react-router-dom';

const Notification = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //notification
    const [massage, setMassage] = React.useState([]);
    React.useEffect(() => {
        fetch("https://ancient-thicket-61342.herokuapp.com/announcement")
            .then((res) => res.json())
            .then((data) => setMassage(data.data.reverse()));
    }, [massage]);

    return (
        <>
            <Tooltip title="Notifications">
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Badge badgeContent={massage.length} color="error">
                        <NotificationsIcon sx={{ color: '#fff' }} />
                    </Badge>
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >

                <Box sx={{ height: '420px', overflowY: 'scroll' }}>
                    <Typography variant='h5' sx={{ textAlign: 'center', mb: 1, color: 'var(--p_color)', fontFamily: 'var(--PT_font)' }}>
                        Notifications
                    </Typography>
                    <Divider />
                    {
                        massage.map(item =>
                            <Link
                                key={item._id}
                                to={`/dashboard/announcements/${item._id}`}
                                sx={{ overflow: 'scroll' }}
                            >
                                <MenuItem>
                                    <ListItemIcon>
                                        <NotificationsIcon sx={{ color: '#FF6F91' }} fontSize="small" />
                                    </ListItemIcon>
                                    <Box>

                                        <Typography variant='body1' sx={{ fontWeight: '600', color: '#000' }}>
                                            {item.title}
                                        </Typography>
                                        <Typography sx={{ color: 'var(--pt_color)', fontStyle: 'italic' }} variant='body2'>
                                            {item.date}
                                        </Typography>
                                    </Box>
                                </MenuItem>
                                <Divider />
                            </Link>
                        )
                    }

                </Box>
                <Divider />
                <Link to='/dashboard/announcements'>
                    <Typography variant='h6' sx={{ textAlign: 'center', margin: '3px 0 0', color: '#555', fontFamily: 'var(--PT_font)', fontWeight: '400' }}>
                        All Notifications
                    </Typography>
                </Link>
            </Menu>
        </>
    );
};

export default Notification;