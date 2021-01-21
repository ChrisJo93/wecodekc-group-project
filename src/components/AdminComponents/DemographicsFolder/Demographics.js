import React from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

//material ui imports
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { withStyles, createStyles } from '@material-ui/core/styles';

const muiStyles = (theme) =>
  createStyles({
    containerStuff: {
      margin: '50px 0px 0px 0px',
    },
  });

function DemographicsTable(props) {
  const rows = props.userData;
  return (
    <Paper className={props.classes.containerStuff}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Volunteer Role</TableCell>
            <TableCell>Ethnicity</TableCell>
            <TableCell>Gender Identity</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Highest Education Level</TableCell>
            <TableCell>Zip Code</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.role_label}</TableCell>
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

export default connect(mapStoreToProps)(
  withStyles(muiStyles)(DemographicsTable)
);
