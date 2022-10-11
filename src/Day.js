import dayjs from "dayjs";
import { Button, Typography, Box } from '@mui/material';
import React, { useContext, useState, useEffect } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import GlobalContext from "./context/GlobalContext";

export default function Day({ day, rowIndex }) {
    const [dayEvents, setDayEvents] = useState([]);
    const {
        setDaySelected,
        setShowEventModal,
        filteredEvents,
        setSelectedEvent,
    } = useContext(GlobalContext);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const events = filteredEvents.filter(
            (evt) =>
                dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
        );
        setDayEvents(events);
    }, [filteredEvents, day]);

    return (
        <Box sx={{ cursor: 'pointer', position: "absolute" }}>
            <Button sx={{ cursor: 'pointer', position: "absolute" }}
                onClick={() => {
                    setDaySelected(day);
                    setShowEventModal(true);
                }}>
                {rowIndex === 0 && (
                    <Typography sx={{
                        textAlign: 'center', fontSize: 14, fontWeight: 700, position: 'relative',
                        top: -85, color: 'black'
                    }}>
                        {day.format("ddd").toUpperCase()}
                    </Typography>
                )}
                {day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ?
                    <Typography sx={{
                        textAlign: "center", fontSize: 12, fontWeight: 700, position: 'relative',
                        top: -65, backgroundColor: "blue", borderRadius: 9999, color: "white", padding: 1 / 2
                    }} >
                        {day.format("DD")}
                    </Typography>
                    : <Typography sx={{
                        textAlign: 'center', fontSize: 12, fontWeight: 700, position: 'relative',
                        top: -65, color: 'black'
                    }} >
                        {day.format("DD")}
                    </Typography>
                }
            </Button>
            {
                dayEvents.length > 1 ? <> <Button
                    id="demo-positioned-button"
                    aria-controls={open ? 'demo-positioned-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    View events
                </Button>
                    <Menu
                        id="demo-positioned-menu"
                        aria-labelledby="demo-positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        sx={{ mt: 4 }}
                    >
                        <MenuItem onClick={handleClose}>
                            <Typography sx={{ cursor: 'pointer' }}
                                onClick={() => {
                                    setDaySelected(day);
                                    setShowEventModal(true);
                                }}>
                                {dayEvents.map((evt, idx) => (
                                    <Typography
                                        key={idx}
                                        onClick={() => setSelectedEvent(evt)}
                                        sx={{ border: 1, borderRadius: 9999, mt: 1, textAlign: "center", backgroundColor: "red", color: "white", padding: 1 / 2 }}
                                    >
                                        {evt.title}
                                    </Typography>
                                ))}
                            </Typography>
                        </MenuItem>
                    </Menu> </> : ""
            }


        </Box >
    )
}