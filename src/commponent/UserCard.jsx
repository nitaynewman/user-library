import React from 'react';
// import '../style/Card.css'
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material';


const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <Card style={{
        width: '100%', minHeight: '450px', padding: '20px 0px', float: 'left', backgroundColor: '#f90', position: 'relative' }}>
      <CardMedia 
        style={{width: '100px', height: '100px', borderRadius: '50%', backgroundSize: 'cover', position: 'absolute', left: '50%', transform: 'translateX(-50%)', border: '4px solid #f90'}}
        component="img"
        alt="User Image"
        
        image={user.image}
      />
      <CardContent style={{ width: '90%', minHeight: '280px', marginTop: '58px', padding: '60px 5% 10px 5%', textAlign: 'center', backgroundColor: '#fffa' }}>
        <Typography variant="h5">
          <h6>{user.name.title} {user.name.first} {user.name.last}</h6>
        </Typography>
        <Typography variant="body2" color="textSecondary">
        <h4><i className="ri-mail-line" /> Email: {user.email}</h4>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          <i className="ri-shield-user-fill" /> uuid: {user.uuid}
        </Typography>
        <Typography variant="body2" color="textSecondary">
            <h4><i className="ri-user-location-line"/> Location: {user.location.street}, {user.location.city}, {user.location.country}</h4>
        </Typography>
        <Button onClick={() => onEdit(user)} 
        // style={{ marginRight: '10px' }}
        >
          Edit
        </Button>
        <Button onClick={() => onDelete(user.id)} color="error">
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserCard;
