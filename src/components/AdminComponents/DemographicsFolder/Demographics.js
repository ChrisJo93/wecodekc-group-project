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
<<<<<<< HEAD
            <TableCell>Ethnicity</TableCell>
            <TableCell>Gender</TableCell>
=======
            <TableCell>ethnicity</TableCell>
            <TableCell>gender</TableCell>
            <TableCell>Age</TableCell>
>>>>>>> develop
            <TableCell>Highest Education Level</TableCell>
            <TableCell>Zip Code</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.role_label}</TableCell>
              <TableCell>{'active courses'}</TableCell>
              <TableCell>{row.ethnicity_label}</TableCell>
              <TableCell>{row.gender_label}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.education_label}</TableCell>
              <TableCell>{row.zip_code}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default connect(mapStoreToProps)(DemographicsTable);
