import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

//MATERIAL UI IMPORTS
import {
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Button,
  FormControl,
  TableContainer,
} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import FaceIcon from '@material-ui/icons/Face';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

//custom imports
import swal from 'sweetalert';
import ControlPanelAccountControl from '../UserManagement/ControlPanelAccountControl';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function VerifyTable(props) {
  let rows = props.userData;
  let permissionLevel;
  let role;

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

  const handleButton = (selection, id, email, first_name) => (e) => {
    switch (selection) {
      case 'profile':
        props.dispatch({
          type: 'GET_NEW_USER_DETAIL',
          payload: id,
        });
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
                      email: email,
                      first_name: first_name,
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
                  email: email,
                  first_name: first_name,
                },
              })
          : swal({
              title: 'Please select Role and Permissions for this user',
              icon: 'warning',
            });
        break;
      default:
        break;
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Profile Information </TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Background Check Permission</TableCell>
            <TableCell>Volunteer Role </TableCell>
            <TableCell>Permissions</TableCell>
            <TableCell>Finalize</TableCell>
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
              </TableCell>
              <TableCell>{row.first_name}</TableCell>
              <TableCell>{row.last_name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>
                {row.background_check_permission === true
                  ? 'Permission Granted'
                  : '! Denied !'}
              </TableCell>
              <TableCell>
                {
                  <FormControl style={{ minWidth: 120 }}>
                    <Select
                      style={{ minWidth: 160, maxWidth: 160 }}
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
                      style={{ minWidth: 140, maxWidth: 140 }}
                      variant="outlined"
                      labelId="permissionLevel"
                      id="permissionLevel"
                      value={permissionLevel}
                      onChange={handleVerification('permissionLevel')}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={6}>Reject</MenuItem>
                      <MenuItem value={2}>Volunteer</MenuItem>
                      <MenuItem value={3}>Mentor</MenuItem>
                      <MenuItem value={4}>Admin</MenuItem>
                    </Select>
                  </FormControl>
                }
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleButton(
                    'finalize',
                    row.id,
                    row.email,
                    row.first_name
                  )}
                >
                  <CheckCircleIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <ControlPanelAccountControl />
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default connect(mapStoreToProps)(VerifyTable);
