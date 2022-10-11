import dayjs from "dayjs";
import React, { useContext } from "react";
import GlobalContext from "./context/GlobalContext";
import { Button, Typography, Box } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function CalenderHeader() {
    const { monthIndex, setMonthIndex } = useContext(GlobalContext)
    function handlePrevMonth() {
        setMonthIndex(monthIndex - 1);
    }
    function handleNextMonth() {
        setMonthIndex(monthIndex + 1);
    }
    function handleReset() {
        setMonthIndex(
            monthIndex === dayjs().month()
                ? monthIndex + Math.random()
                : dayjs().month()
        );
    }
    return (
        <Box sx={{ display: 'flex', my: 2, ml: 60 }}>
            <Button variant="outlined" onClick={handleReset}>
                Today
            </Button>
            <Button onClick={handlePrevMonth}>
                <ChevronLeftIcon></ChevronLeftIcon>
            </Button>
            <Button onClick={handleNextMonth}>
                <ChevronRightIcon></ChevronRightIcon>
            </Button>
            <Typography sx={{ fontFamily: "sans-serif", fontSize: 20 }}>
                {dayjs(new Date(dayjs().year(), monthIndex)).format(
                    "MMMM YYYY"
                )}
            </Typography>
        </Box>
    )

}