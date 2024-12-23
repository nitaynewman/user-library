import React, { useState, useEffect } from 'react';
import { Modal, TextField, Button, Box } from '@mui/material';
import { validateUserFields } from '../utils/validation';


const EditUserModal = ({ open, onClose, user, userList, onSave }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [uuid, setUuid] = useState('');

  useEffect(() => {
    if (user) {
      setUuid(user.uuid || '');
      setFirstName(user.name?.first || '');
      setLastName(user.name?.last || '');
      setEmail(user.email || '');
      setStreet(user.location?.street || '');
      setCity(user.location?.city || '');
      setCountry(user.location?.country || '');
    }
  }, [user]);

  const handleSave = () => {
    const updatedUser = {
      ...user,
      id: user.id,
      uuid: user.uuid, 
      name: { first: firstName, last: lastName },
      email,
      location: { street, city, country },
    };
  
    const errors = validateUserFields(updatedUser, userList);
    if (Object.keys(errors).length > 0) {
      alert(Object.values(errors).join('\n'));
      return;
    }
  
    onSave(updatedUser);
  };
  

  if (!user) {
    return null;
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
          padding: '20px',
          background: 'white',
          margin: 'auto',
          top: '50%',
          left: '50%',
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          width: 400,
      }}>
        <h1>Edit User</h1>
        <TextField
          label="uuid"
          value={uuid}
          onChange={(e) => setUuid(e.target.value)}
          fullWidth
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          fullWidth
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          fullWidth
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          fullWidth
          style={{ marginBottom: '10px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          style={{ marginRight: '10px', backgroundColor: '#f90' }}
        >
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose} >
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default EditUserModal;
