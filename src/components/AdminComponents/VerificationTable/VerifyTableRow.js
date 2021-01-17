import React from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

//MATERIAL UI IMPORTS
import {
  Select,
  TableCell,
  TableRow,
  MenuItem,
  Button,
  FormControl,
  IconButton,
  Collapse,
  Box,
} from '@material-ui/core/';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

//custom dependencies
import swal from 'sweetalert';

import ControlPanelVerification from './ControlPanelVerification';

function VerifyTableRow(props) {
  let permissionLevel;
  let role;
  const [open, setOpen] = React.useState(false);

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

  const openDropdown = () => {
    setOpen(!open);
  };

  const handleButton = (selection, id, email, first_name) => (e) => {
    console.log();
    switch (selection) {
      case 'profile':
        props.dispatch({
          type: 'GET_NEW_USER_DETAIL',
          payload: id,
        });
        openDropdown();
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

  const { row } = props;
  return (
    <React.Fragment>
      <TableRow key={row.id}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={handleButton('profile', row.id)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
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
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <ControlPanelVerification />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default connect(mapStoreToProps)(VerifyTableRow);
