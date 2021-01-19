import React from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

//MATERIAL UI IMPORTS
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer,
} from '@material-ui/core/';

//custom imports
import VerifyTableRow from './VerifyTableRow';

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
              <VerifyTableRow
                key={row.id}
                row={row}
                callBack={props.callBack}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default connect(mapStoreToProps)(VerifyTable);
