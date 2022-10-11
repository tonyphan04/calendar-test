import { Box, Button, Typography, Paper } from "@mui/material";
import DragHandleIcon from '@mui/icons-material/DragHandle';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import ScheduleIcon from '@mui/icons-material/Schedule';
import SegmentIcon from '@mui/icons-material/Segment';
import React, { useContext, useState } from "react";
import GlobalContext from "./context/GlobalContext";
import dayjs, { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

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
    const [value, setValue] = React.useState(selectedEvent ? selectedEvent.value : "");
    function handleSubmit(e) {
        e.preventDefault();
        const calendarEvent = {
            title,
            description,
            day: daySelected.valueOf(),
            value,
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
            <Paper sx={{ width: 400 }}>
                <Box sx={{ display: 'flex' }}>
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
                        <TextField
                            placeholder="Add title"
                            value={title}
                            required
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <ScheduleIcon></ScheduleIcon>
                        <Typography>{daySelected.format("dddd, MMMM DD")}</Typography>
                        <SegmentIcon></SegmentIcon>
                        <TextField
                            type="text"
                            name="description"
                            placeholder="Add a description"
                            value={description}
                            required
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Box>
                </Box>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <TimePicker
                        label="Basic example"
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        sx={{ width: 70 }}
                    />
                </LocalizationProvider>
                <Box>
                    <Button
                        variant="outlined"
                        type="submit"
                        onClick={handleSubmit}
                        sx={{ mt: 5 }}
                    >
                        Save
                    </Button>
                </Box>
            </Paper>
        </>
    );
}