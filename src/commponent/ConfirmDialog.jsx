import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const ConfirmDialog = ({ open, onClose, onConfirm, message }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>Confirm</DialogTitle>
    <DialogContent>{message}</DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onConfirm} color="primary">
        Confirm
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;
