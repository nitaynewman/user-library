import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { validateUserFields } from '../utils/validation';

const AddUserModal = ({ open, onClose, onAdd, userList }) => {
  const [formData, setFormData] = useState({
    uuid: '',
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    city: '',
    street: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    const newUser = {
      uuid: formData.uuid,
      name: { first: formData.firstName, last: formData.lastName },
      email: formData.email,
      location: { street: formData.street, city: formData.city, country: formData.country },
      id: Date.now().toString(),
    };
  
    const errors = validateUserFields(newUser, userList);
    if (Object.keys(errors).length > 0) {
      alert(Object.values(errors).join('\n'));
      return;
    }
  
    onAdd(newUser);
  };
  

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          padding: '20px',
          background: 'white',
          margin: 'auto',
          top: '50%',
          left: '50%',
          position: 'absolute',
          transform: 'translate(-50%, -50%)',
          width: 400,
        }}
      >
        <h1>Add User</h1>
        <TextField
          name="uuid"
          label="UUID"
          value={formData.uuid}
          onChange={handleChange}
          error={!!errors.uuid}
          helperText={errors.uuid}
          fullWidth
          style={{ marginBottom: '10px' }}
        />
        <TextField
          name="firstName"
          label="First Name"
          value={formData.firstName}
          onChange={handleChange}
          error={!!errors.firstName}
          helperText={errors.firstName}
          fullWidth
          style={{ marginBottom: '10px' }}
        />
        <TextField
          name="lastName"
          label="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          error={!!errors.lastName}
          helperText={errors.lastName}
          fullWidth
          style={{ marginBottom: '10px' }}
        />
        <TextField
          name="email"
          label="Email"
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
          fullWidth
          style={{ marginBottom: '10px' }}
        />
        <TextField
          name="street"
          label="Street"
          value={formData.street}
          onChange={handleChange}
          fullWidth
          style={{ marginBottom: '10px' }}
        />
        <TextField
          name="city"
          label="City"
          value={formData.city}
          onChange={handleChange}
          error={!!errors.location}
          helperText={errors.location}
          fullWidth
          style={{ marginBottom: '10px' }}
        />
        <TextField
          name="country"
          label="Country"
          value={formData.country}
          onChange={handleChange}
          fullWidth
          style={{ marginBottom: '10px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAdd}
          style={{ marginRight: '10px', backgroundColor: '#f90' }}
        >
          Add
        </Button>
        <Button variant="outlined" color="error" onClick={onClose} style={{backgroundColor: '#fffa'}}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default AddUserModal;
