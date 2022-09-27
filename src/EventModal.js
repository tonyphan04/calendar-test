import { Box, Button, Typography } from "@mui/material";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SegmentIcon from '@mui/icons-material/Segment';
import React, { useContext, useState } from "react";
import GlobalContext from "./context/GlobalContext";

export default function EventModal() {
    const {
        setShowEventModal,
        daySelected,
        dispatchCalEvent,
        selectedEvent,
    } = useContext(GlobalContext);

    const [title, setTitle] = useState(
        selectedEvent ? selectedEvent.title : ""
    );
    const [description, setDescription] = useState(
        selectedEvent ? selectedEvent.description : ""
    );
    const [selectedLabel, setSelectedLabel] = useState(
        selectedEvent
            ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
            : labelsClasses[0]
    );

    function handleSubmit(e) {
        e.preventDefault();
        const calendarEvent = {
            title,
            description,
            label: selectedLabel,
            day: daySelected.valueOf(),
            id: selectedEvent ? selectedEvent.id : Date.now(),
        };
        if (selectedEvent) {
            dispatchCalEvent({ type: "update", payload: calendarEvent });
        } else {
            dispatchCalEvent({ type: "push", payload: calendarEvent });
        }

        setShowEventModal(false);
    }
    return (
        <>
            <Box sx={{ border: 1, width: 500 }}>
                <Box sx={{ display: 'flex' }}>
                    <DragHandleIcon></DragHandleIcon>
                    <Box>
                        {selectedEvent && (
                            <Button>
                                <DeleteIcon
                                    onClick={() => {
                                        dispatchCalEvent({
                                            type: "delete",
                                            payload: selectedEvent,
                                        });
                                        setShowEventModal(false);
                                    }}
                                >
                                </DeleteIcon>
                            </Button>
                        )}
                        <Button onClick={() => setShowEventModal(false)}>
                            <CloseIcon></CloseIcon>
                        </Button>
                    </Box>
                </Box>
                <Box>
                    <Box>
                        <div></div>
                        <input
                            type="text"
                            name="title"
                            placeholder="Add title"
                            value={title}
                            required
                            className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <ScheduleIcon></ScheduleIcon>
                        <Typography>{daySelected.format("dddd, MMMM DD")}</Typography>
                        <SegmentIcon></SegmentIcon>
                        <input
                            type="text"
                            name="description"
                            placeholder="Add a description"
                            value={description}
                            required
                            className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Box>
                </Box>
                <Box>
                    <Button
                        variant="outlined"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Save
                    </Button>
                </Box>
            </Box>
        </>
    );
}