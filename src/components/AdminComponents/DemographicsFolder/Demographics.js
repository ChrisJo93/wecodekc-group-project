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
import { FormControl } from '@material-ui/core';

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
            <TableCell>ethnicity</TableCell>
            <TableCell>gender</TableCell>
            <TableCell>Age</TableCell>
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
