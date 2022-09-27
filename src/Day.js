import dayjs from "dayjs";
import { Button, Typography } from '@mui/material';
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "./context/GlobalContext";

export default function Day({ day, rowIndex }) {
    const [dayEvents, setDayEvents] = useState([]);
    const {
        setDaySelected,
        setShowEventModal,
        filteredEvents,
        setSelectedEvent,
    } = useContext(GlobalContext);

    useEffect(() => {
        const events = filteredEvents.filter(
            (evt) =>
                dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
        );
        setDayEvents(events);
    }, [filteredEvents, day]);

    function getCurrentDayClass() {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
            ? "bg-blue-600 text-white rounded-full w-7"
            : "";
    }
    return (
        <div>
            <header >
                {rowIndex === 0 && (
                    <Typography sx={{
                        textAlign: 'center', fontSize: 14, fontWeight: 700, position: 'relative',
                        top: -70
                    }}>
                        {day.format("ddd").toUpperCase()}
                    </Typography>
                )}
                <Typography sx={{
                    textAlign: 'center', fontSize: 12, fontWeight: 700, position: 'relative',
                    top: -55
                }}>
                    {day.format("DD")}
                </Typography>
            </header>
            <div
                className="flex-1 cursor-pointer"
                onClick={() => {
                    setDaySelected(day);
                    setShowEventModal(true);
                }}
            >
                {dayEvents.map((evt, idx) => (
                    <Button
                        key={idx}
                        onClick={() => setSelectedEvent(evt)}
                        className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
                    >
                        {evt.title}
                    </Button>
                ))}
            </div>
        </div >
    )
}