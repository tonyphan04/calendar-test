import React from "react";
import EventButton from './EventButton'
import SmallCalendar from "./SmallCalendar";
import { Button, Typography, Box } from "@mui/material";
//import Labels from "./Labels";
//import './style.css'

export default function SideBar() {
    return (
        <Box sx={{ width: { xl: 300, lg: 300, md: 300, sm: 300 }, borderTop: 1 }}>
            <EventButton></EventButton>
            <SmallCalendar></SmallCalendar>
        </Box>
    )
}
