import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function Calendar({ clients }) {
  // Assuming each client object has an "appointments" array with date-time strings
  // Example structure: [{ id: 1, firstName: 'John', lastName: 'Doe', appointments: ['2023-12-08 10:00 AM'] }]
  
  const allAppointments = clients.reduce((acc, client) => acc.concat(client.appointments), []);

  // Assuming the date-time format is 'YYYY-MM-DD HH:mm A'
  const formatDateTime = (dateTimeString) => {
    const dateTime = new Date(dateTimeString);
    return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  return (
    <div style={{  marginRight:'50px',marginLeft:'50px'}}>
      <h2 style={{fontSize:"30px" ,marginLeft:"610px"}}>Calendar View</h2>
      <TableContainer component={Paper} style={{ border: '10px solid darkgrey' }}>
        <Table>
          <TableHead >
            <TableRow >
              <TableCell style={{ border: '3px solid gray', padding: '10px' }}>Date</TableCell>
              <TableCell style={{ border: '3px solid gray', padding: '10px' }}>Time</TableCell>
              <TableCell style={{ border: '3px solid gray', padding: '10px' }}>Client</TableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {allAppointments.map((appointment, index) => (
              <TableRow key={index}>
                <TableCell style={{ border: '3px solid gray', padding: '10px' }}>{formatDateTime(appointment)}</TableCell>
                <TableCell style={{ border: '3px solid gray', padding: '10px' }}>{new Date(appointment).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                <TableCell style={{ border: '3px solid gray', padding: '10px' }}>{getClientNameOrID(appointment, clients)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Calendar;

function getClientNameOrID(appointment, clients) {
  // Find the client with the matching appointment
  const client = clients.find((client) => client.appointments.includes(appointment));

  // Return client name if found, otherwise return client ID
  return client ? `${client.firstName} ${client.lastName}` : 'Unknown';
}
