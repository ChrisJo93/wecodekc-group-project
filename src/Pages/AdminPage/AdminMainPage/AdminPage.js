import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';

//CUSTOM FILE IMPORTS
import SideBar from '../../../components/AdminComponents/AdminSidebar/Sidebar';
import './AdminPage.css';

//CUSTOM MATERIAL UI IMPORTS
import { LinearProgress } from '@material-ui/core';

class AdminPage extends Component {
  state = {
    //access_level gets passed down to determine which tabs/options are selectable/displayed
    access_level: null,
  };

  handleSidebar = (id) => {
    //This function is passed down to the sidebar component, which returns the clicked tab to change page.
    this.setState({
      ...this.state,
      selection: id,
    });
  };

  componentDidMount() {
    //grabs all users and events
    this.props.dispatch({
      type: 'GET_ADMIN_DATA',
    });
    this.setState({
      ...this.state,
      access_level: this.props.store.user.access_level_id,
    });
  }
  render() {
    const userData = this.props.store.allUsers;
    return (
      <div className="topBorder">
        {this.props.store.allUsers.length > 0 ? (
          //displays the navigation, sidebar menu, and {display} <- which is switched above.

          <SideBar />
        ) : (
          <LinearProgress color="secondary" />
        )}
      </div>
    );
  }
}

export default connect(mapStoreToProps)(AdminPage);
