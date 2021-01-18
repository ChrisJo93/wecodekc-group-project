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

//custom imports

import ControlPanelAccountControl from '../UserManagement/ControlPanelAccountControl';
import VerifyTableRow from './VerifyTableRow';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function VerifyTable(props) {
  let rows = props.userData;

  return (
    <Paper>
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
              <VerifyTableRow key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default connect(mapStoreToProps)(VerifyTable);
