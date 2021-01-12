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
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import swal from 'sweetalert';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function VerifyTable(props) {
  console.log(props);
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

  const handleButton = (selection, id) => (e) => {
    switch (selection) {
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
      default:
        break;
    }
  };
  console.log(rows);
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>View Profile</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Birth Date</TableCell>
            <TableCell>Background Check Permission</TableCell>
            <TableCell>Role </TableCell>
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
                    href="#contained-buttons"
                  >
                    <FaceIcon />
                  </Button>
                }
              </TableCell>
              <TableCell>{row.first_name}</TableCell>
              <TableCell>{row.last_name}</TableCell>
              <TableCell>{row.phone_number}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.birth_date}</TableCell>
              <TableCell>
                {row.background_check_permission === true
                  ? 'Permission Granted'
                  : '! Denied !'}
              </TableCell>
              <TableCell>
                {
                  <Select
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
                }
              </TableCell>
              <TableCell>
                {
                  <Select
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
                    <MenuItem value={4}>ADMIN</MenuItem>
                  </Select>
                }
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleButton('finalize', row.id)}
                >
                  <CheckCircleIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default connect(mapStoreToProps)(VerifyTable);
