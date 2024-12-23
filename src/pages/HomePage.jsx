import React, { useState, useEffect } from 'react';
import { useUsers } from '../hooks/useUsers'; 
import UserCard from '../commponent/UserCard';
import EditUserModal from '../commponent/EditUser';
import AddUserModal from '../commponent/AddUser';
import { validateUserFields } from '../utils/validation';
import {
  Button,
  Container,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';

const Home = () => {
  const { data: users, isLoading } = useUsers();
  const [userList, setUserList] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    if (users) setUserList(users);
  }, [users]);

  const handleCloseEditModal = () => setEditModalOpen(false);
  const handleCloseAddModal = () => setAddModalOpen(false);

  const handleSave = (updatedUser) => {
    const errors = validateUserFields(updatedUser, userList);
    if (Object.keys(errors).length > 0) {
      alert(Object.values(errors).join('\n'));
      return;
    }

    setUserList((prev) =>
      prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditModalOpen(false);
  };

  const handleAddUser = (newUser) => {
    const errors = validateUserFields(newUser, userList);
    if (Object.keys(errors).length > 0) {
      alert(Object.values(errors).join('\n'));
      return;
    }

    setUserList((prev) => [...prev, { ...newUser, id: Date.now().toString() }]);
    setAddModalOpen(false);
  };

  const handleDelete = (userId) => {
    setUserToDelete(userId);
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    setUserList((prev) => prev.filter((user) => user.id !== userToDelete));
    setConfirmOpen(false);
    setUserToDelete(null);
  };

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Users Library
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setAddModalOpen(true)}
        style={{ marginBottom: '20px', backgroundColor: '#f90' }}
      >
        Add User
      </Button>

      <Grid container spacing={3}>
        {userList.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <UserCard
              user={user}
              onEdit={(user) => {
                setSelectedUser(user);
                setEditModalOpen(true);
              }}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>

      <EditUserModal
        open={editModalOpen}
        onClose={handleCloseEditModal}
        user={selectedUser}
        userList={userList}
        onSave={handleSave}
      />

      <AddUserModal
        open={addModalOpen}
        onClose={handleCloseAddModal}
        userList={userList}
        onAdd={handleAddUser}
      />

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this user?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Home;
