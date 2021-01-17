import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import Grid from '@material-ui/core/Grid';

//MATERIAL UI IMPORTS
import {
  Typography,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableBody,
  Collapse,
  Box,
} from '@material-ui/core';

// Basic class component structure for React with default state
// value setup. When making a new component be sure to replace
// the component name TemplateClass with the name for the new
// component.
class ControlPanelUserManagement extends Component {
  render() {
    const details = this.props.store.verifiedUserDetailReducer;
    return details.length > 0 ? (
      <div>
        <TableRow>
          <TableCell>
            <Collapse>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Details
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>

                      <TableCell>Skills</TableCell>

                      <TableCell>Education</TableCell>

                      <TableCell>Notes</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <Grid container>
                      <Grid item lg={2}>
                        <p>
                          <span>Last Name: </span>
                          {details[0].last_name}
                        </p>
                        <Typography>
                          Volunteer Role: {details[0].role_label}
                        </Typography>
                        <Typography>
                          Phone: {details[0].phone_number}
                        </Typography>
                      </Grid>
                      <Grid item lg={2}>
                        <ul>
                          {details[0].skills_label_array.map((element) => (
                            <li>{element}</li>
                          ))}
                        </ul>
                      </Grid>
                      <Grid item lg={2}>
                        <ul>
                          <li>{details[0].education_label}</li>
                        </ul>
                      </Grid>
                      <Grid item lg={6}>
                        <ul>
                          {details[0].admin_note_array.map((element) => (
                            <li>{element}</li>
                          ))}
                        </ul>
                      </Grid>
                    </Grid>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </div>
    ) : (
      <div>
        <Typography variant="h4">Select a user to get details</Typography>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(ControlPanelUserManagement);
