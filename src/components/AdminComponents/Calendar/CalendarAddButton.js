import React from 'react';

//Material-UI imports
import { Grid, Button } from '@material-ui/core';

//custom file imports
import CreateEventDialog from './CreateEventDialog';

const emails = ['username@gmail.com', 'user02@gmail.com'];

export default function CalendarAddButton() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      {' '}
      <Button color="primary" variant="contained" onClick={handleClickOpen}>
        Add Event
      </Button>
      <CreateEventDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
