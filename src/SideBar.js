import React from "react";
import EventButton from './EventButton'
import SmallCalendar from "./SmallCalendar";
//import Labels from "./Labels";
//import './style.css'

export default function SideBar() {
    return (
        <aside className="sidebar">
            <EventButton></EventButton>
            <SmallCalendar></SmallCalendar>
        </aside>
    )
}
