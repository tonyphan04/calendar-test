import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "./context/GlobalContext";
import { Button, Typography, Box } from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getMonth } from "./util";

export default function SmallCalendar() {
    const [currentMonthIdx, setCurrentMonthIdx] = useState(
        dayjs().month()
    );
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    useEffect(() => {
        setCurrentMonth(getMonth(currentMonthIdx));
    }, [currentMonthIdx]);

    const {
        monthIndex,
        setSmallCalendarMonth,
        setDaySelected,
        daySelected,
    } = useContext(GlobalContext);

    useEffect(() => {
        setCurrentMonthIdx(monthIndex);
    }, [monthIndex]);

    function handlePrevMonth() {
        setCurrentMonthIdx(currentMonthIdx - 1);
    }
    function handleNextMonth() {
        setCurrentMonthIdx(currentMonthIdx + 1);
    }
    const format = "DD-MM-YY";
    function getDayClass(day) {
        const format = "DD-MM-YY";
        const nowDay = dayjs().format(format);
        const currDay = day.format(format);
        const slcDay = daySelected && daySelected.format(format);
        if (nowDay === currDay) {
            return "bg-blue-500 rounded-full text-white";
        } else if (currDay === slcDay) {
            return "bg-blue-100 rounded-full text-blue-600 font-bold";
        } else {
            return "";
        }
    }
    return (
        <div >
            <header >
                <Box sx={{ display: 'flex', my: 2 }}>
                    <Typography sx={{ fontFamily: "sans-serif", fontSize: 18, fontWeight: 600, ml: 2, mt: 1 }}>
                        {dayjs(new Date(dayjs().year(), currentMonthIdx)).format(
                            "MMMM YYYY"
                        )}
                    </Typography>
                    <Box sx={{ flexGrow: 2 }}>
                        <Button onClick={handlePrevMonth}>
                            <ChevronLeftIcon></ChevronLeftIcon>
                        </Button>
                        <Button onClick={handleNextMonth}>
                            <ChevronRightIcon></ChevronRightIcon>
                        </Button>
                    </Box>
                </Box>
            </header>
            <div>
                <TableContainer component={Paper} sx={{ width: { xl: 300, lg: 300, md: 300, sm: 300 } }}>
                    <Table >
                        <TableBody>
                            <TableRow>
                                {currentMonth[0].map((day, i) => (
                                    <TableCell>
                                        <Typography key={i} sx={{ fontSize: 10 }}>
                                            {day.format("dd").charAt(0)}
                                        </Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                            {currentMonth.map((row, i) => (
                                <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    {row.map((day, idx) => (
                                        <TableCell>
                                            {
                                                (dayjs().format(format) === day.format(format)) ? <Typography
                                                    sx={{ cursor: "pointer", fontSize: 10, backgroundColor: "#2196f3", borderRadius: 9999, color: "white", }}
                                                    key={idx}
                                                    onClick={() => {
                                                        setSmallCalendarMonth(currentMonthIdx);
                                                        setDaySelected(day);
                                                    }}
                                                >
                                                    {day.format("D")}
                                                </Typography> : <Typography
                                                    sx={{ cursor: "pointer", fontSize: 10 }}
                                                    key={idx}
                                                    onClick={() => {
                                                        setSmallCalendarMonth(currentMonthIdx);
                                                        setDaySelected(day);
                                                    }}
                                                >
                                                    {day.format("D")}
                                                </Typography>
                                            }
                                            {/* {
                                                (day.format(format) === (daySelected && daySelected.format(format))) ? <Typography
                                                    sx={{ cursor: "pointer", fontSize: 10, backgroundColor: "#bbdefb", borderRadius: 9999, color: "#1e88e5" }}
                                                    key={idx}
                                                    onClick={() => {
                                                        setSmallCalendarMonth(currentMonthIdx);
                                                        setDaySelected(day);
                                                    }}
                                                    className={`py-1 w-full ${getDayClass(day)}`}
                                                >
                                                    {day.format("D")}
                                                </Typography> : ''
                                            } */}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        </div >
    )
}