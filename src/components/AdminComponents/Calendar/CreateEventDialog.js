import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { blue } from '@material-ui/core/colors';
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContentText,
  DialogContent,
  TextField,
} from '@material-ui/core';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

export default function CreateEventDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle id="create-event">Create an event</DialogTitle>
      <DialogContent>
        <DialogContentText>Fill out the form</DialogContentText>

        <TextField variant="outlined" placeholder="title of event"></TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" variant="contained">
          Add
        </Button>
        <Button onClick={handleClose} color="secondary" variant="contained">
          never mind
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CreateEventDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
