import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  TextField,
  
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import clientsData from './clientsData'; 
import UpdateIcon from '@mui/icons-material/Update';


function ClientList({ onDeleteAppointment }) {
  const [clients, setClients] = useState(clientsData);
  const [newClient, setNewClient] = useState({
    firstName: '',
    lastName: '',
    location: '',
    appointments: [],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);

  const handleAddClient = () => {
    setClients((prevClients) => [
      ...prevClients,
      {
        ...newClient,
        id: prevClients.length > 0 ? prevClients[prevClients.length - 1].id + 1 : 1,
      },
    ]);

    setNewClient({
      firstName: '',
      lastName: '',
      location: '',
      appointments: [],
    });
  };

  const handleDeleteClient = (clientId) => {
    setClients((prevClients) => prevClients.filter((client) => client.id !== clientId));
  };

  const handleEditClient = (clientId) => {
    const selectedClient = clients.find((client) => client.id === clientId);
    setNewClient(selectedClient);
    setIsEditing(true);
    setSelectedClientId(clientId);
  };

  const handleUpdateClient = () => {
    setClients((prevClients) =>
      prevClients.map((client) =>
        client.id === selectedClientId ? { ...newClient, id: client.id } : client
      )
    );

    setIsEditing(false);
    setSelectedClientId(null);
    setNewClient({
      firstName: '',
      lastName: '',
      location: '',
      appointments: [],
    });
  };
  useEffect(() => {
    setClients((prevClients) => {
      // If you need to update clients when clientsData changes, you can setClients(clientsData)
      // But make sure this won't cause an infinite loop
      return clientsData;
    });
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '30px' }}>
        <TextField
          label="First Name"
          size="small"
          value={newClient.firstName}
          onChange={(e) => setNewClient({ ...newClient, firstName: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Last Name"
          size="small"
          value={newClient.lastName}
          onChange={(e) => setNewClient({ ...newClient, lastName: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Location"
          size="small"
          value={newClient.location}
          onChange={(e) => setNewClient({ ...newClient, location: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Appointments"
          size="small"
          placeholder="yyyy-mm-dd hh:mm AM/PM"
          value={newClient.appointments.join(',')}
          onChange={(e) =>
            setNewClient({ ...newClient, appointments: e.target.value.split(',') })
          }
          style={{ marginRight: '10px' }}
        />
        {isEditing ? (
          <IconButton variant="contained" color="primary" onClick={handleUpdateClient}>
            <UpdateIcon />
          </IconButton>
        ) : (
          <IconButton
            variant="contained"
            color="primary"
            onClick={handleAddClient}
            style={{ marginLeft: '10px' }}
          >
            <AddIcon />
          </IconButton>
        )}
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Appointments</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.id}</TableCell>
                <TableCell>{client.firstName}</TableCell>
                <TableCell>{client.lastName}</TableCell>
                <TableCell>{client.location}</TableCell>
                <TableCell>
                  <List>
                    {client.appointments.map((appointment, index) => (
                      <div key={index}>
                        <ListItem>
                          <ListItemText primary={appointment} />
                        </ListItem>
                        {index < client.appointments.length - 1 && <Divider />}
                      </div>
                    ))}
                  </List>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => handleEditClient(client.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    size="small"
                    onClick={() => handleDeleteClient(client.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ClientList;
