import React from 'react'
import Day from './Day'
//import './style.css'
import { useTheme, styled, alpha } from '@mui/material/styles'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Month({ month }) {

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ width: { xl: 1600, lg: 1000, md: 800, sm: 500 }, height: 860 }}>
                    <TableBody>
                        {month.map((row, i) => (
                            <TableRow key={i}>
                                {row.map((day, idx) => (
                                    <TableCell scope="row" sx={{ border: 1, cursor: "pointer", borderBlockColor: "gray" }}>
                                        <Day day={day} key={idx} rowIndex={i} />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}