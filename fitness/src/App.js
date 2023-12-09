import React, { useState } from 'react';
import ClientList from './components/ClientList';
import Calendar from './components/Calendar';
import IconButton from '@mui/material/IconButton';
import EventIcon from '@mui/icons-material/Event';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import clients from './components/clientsData'; // Update the path accordingly

function App() {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div>
      <Box  display="flex"
  alignItems="center"
  justifyContent="center"
  flexDirection="row">
      <h1 >Fitness Trainer App</h1>
      </Box>
      <Box  display="flex"
  alignItems="center"
  justifyContent="center"
  flexDirection="row" // Optional: If you want the items to be centered vertically
   mb={10} >
        <Typography variant="h6" style={{ marginRight: '8px' }}>
          Show Calendar:
        </Typography>
        <IconButton onClick={() => setShowCalendar(!showCalendar)}>
          <EventIcon />
        </IconButton>
      </Box>
      {showCalendar ? <Calendar clients={clients} /> : <ClientList clients={clients} />}
    </div>
  );
}

export default App;
