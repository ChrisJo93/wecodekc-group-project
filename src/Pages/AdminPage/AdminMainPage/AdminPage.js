import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import SideBar from '../AdminSidebar/Sidebar';

//CUSTOM MATERIAL UI IMPORTS

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
    console.log('>>>>>>>>>>>', this.props.store.allUsers);
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
    return this.props.store.allUsers.length > 0 ? (
      //displays the navigation, sidebar menu, and {display} <- which is switched above.

      <>
        <SideBar />
      </>
    ) : (
      <p>...loading</p>
    );
  }
}

export default connect(mapStoreToProps)(AdminPage);
