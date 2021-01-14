import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FaceIcon from '@material-ui/icons/Face';
import EditIcon from '@material-ui/icons/Edit';
import swal from 'sweetalert';
import VerificationDialog from '../VerificationTable/VerificationDialog';
import { FormControl } from '@material-ui/core';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function UserTable(props) {
  const toggle = false;
  const rows = props.userData;
  let permissionLevel;
  let role;

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  const emails = ['username@gmail.com', 'user02@gmail.com'];
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleVerification = (selection) => (e) => {
    switch (selection) {
      case 'permissionLevel':
        permissionLevel = e.target.value;
        break;
      case 'role':
        role = e.target.value;
      default:
        break;
    }
  };

  const handleButton = (selection, id) => (e) => {
    switch (selection) {
      case 'toggleEdit':
        toggle = true;
        break;
      case 'finalize':
        permissionLevel && role !== undefined
          ? permissionLevel === 4
            ? swal({
                title: 'You are assigning ADMIN PRIVILEGES to this user',
                text: 'To cancel press escape',
                icon: 'warning',
                dangerMode: true,
              }).then((confirm) => {
                if (confirm) {
                  props.dispatch({
                    type: 'VERIFY_USER',
                    payload: {
                      access_level: permissionLevel,
                      volunteer_role: role,
                      id: id,
                    },
                  });
                  swal('Added!', 'New Admin Created!', 'success');
                }
              })
            : props.dispatch({
                type: 'VERIFY_USER',
                payload: {
                  access_level: permissionLevel,
                  volunteer_role: role,
                  id: id,
                },
              })
          : swal({
              title: 'Please select Role and Permissions for this user',
              icon: 'warning',
            });
        break;
      case 'profile':
        setOpen(true);
        break;
      default:
        break;
    }
  };

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Profile Information </TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Volunteer Role </TableCell>
            <TableCell>Permissions</TableCell>
            <TableCell>Account Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                {
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleButton('profile', row.id)}
                  >
                    <FaceIcon />
                  </Button>
                }
                <VerificationDialog
                  selectedValue={selectedValue}
                  open={open}
                  onClose={handleClose}
                />
              </TableCell>
              <TableCell>{row.first_name}</TableCell>
              <TableCell>{row.last_name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>
                {
                  <FormControl style={{ minWidth: 120 }}>
                    <Select
                      variant="outlined"
                      labelId="roleSelection"
                      id="roleSelection"
                      value={role}
                      onChange={handleVerification('role')}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={1}>Tech Instructor</MenuItem>
                      <MenuItem value={2}>Tech Assistant</MenuItem>
                      <MenuItem value={3}>Classroom Assistant</MenuItem>
                      <MenuItem value={4}>Non Tech Volunteer</MenuItem>
                      <MenuItem value={5}>Social Media Volunteer</MenuItem>
                      <MenuItem value={6}>General Office / Admin Help</MenuItem>
                      <MenuItem value={7}>General IT / Tech Support</MenuItem>
                    </Select>
                  </FormControl>
                }
              </TableCell>
              <TableCell>
                {
                  <FormControl style={{ minWidth: 120 }}>
                    <Select
                      variant="outlined"
                      labelId="permissionLevel"
                      id="permissionLevel"
                      value={permissionLevel}
                      onChange={handleVerification('permissionLevel')}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={2}>Volunteer</MenuItem>
                      <MenuItem value={3}>Mentor</MenuItem>
                      <MenuItem value={4}>ADMIN</MenuItem>
                      <MenuItem value={6}>REMOVE</MenuItem>
                    </Select>
                  </FormControl>
                }
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleButton('finalize', row.id)}
                >
                  <EditIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default connect(mapStoreToProps)(UserTable);
