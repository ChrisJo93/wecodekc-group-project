import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

//material ui imports
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function DemographicsTable(props) {
  const rows = props.userData;
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Volunteer Role</TableCell>
            <TableCell>Active Courses / Events</TableCell>
            <TableCell>Ethnicity</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Highest Education Level</TableCell>
            <TableCell>Zip Code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.volunteer_role}</TableCell>
              <TableCell>{'filler'}</TableCell>
              <TableCell>{row.ethnicity_label}</TableCell>
              <TableCell>{row.gender_label}</TableCell>
              <TableCell>{'filler'}</TableCell>
              <TableCell>{row.zip_code}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default connect(mapStoreToProps)(DemographicsTable);
