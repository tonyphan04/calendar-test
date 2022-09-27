import React, { useContext } from "react";
import './style.css'
import GlobalContext from "./context/GlobalContext";
import { Button, Typography } from "@mui/material";

export default function EventButton() {
    const { setShowEventModal } = useContext(GlobalContext);
    return (
        <Button variant="outlined" sx={{ mt: 1, justifyContent: "left" }}
            onClick={() => setShowEventModal(true)}>
            <Typography>Create</Typography>
        </Button>
    )
}