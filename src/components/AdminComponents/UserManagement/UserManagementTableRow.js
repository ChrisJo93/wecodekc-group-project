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
  Collapse,
  Box,
} from '@material-ui/core/';
import FaceIcon from '@material-ui/icons/Face';
import EditIcon from '@material-ui/icons/Edit';

//custom dependencies
import swal from 'sweetalert';

//custom file imports
import ControlPanelAccountControl from './ControlPanelAccountControl';

function UserManagementTableRow(props) {
  let permissionLevel;
  let role;
  const [open, setOpen] = React.useState(false);

  const handleButton = (selection, id, email, first_name) => (e) => {
    console.log();
    switch (selection) {
      case 'profile':
        props.dispatch({
          type: 'GET_VERIFIED_USER_DETAIL',
          payload: id,
        });
        openDropdown();
        break;

      default:
        break;
    }
  };

  const openDropdown = () => {
    setOpen(!open);
  };

  const { row } = props;
  return (
    <React.Fragment>
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
        <TableCell>{row.role_label}</TableCell>
        <TableCell>{row.access_label}</TableCell>
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
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <ControlPanelAccountControl />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default connect(mapStoreToProps)(UserManagementTableRow);
