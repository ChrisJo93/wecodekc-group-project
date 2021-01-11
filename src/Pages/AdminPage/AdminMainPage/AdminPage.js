import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import SideBar from '../AdminSidebar/Sidebar';

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
    console.log('look ad dis chit', this.props.store);
  }
  render() {
    return (
      //displays the navigation, sidebar menu, and {display} <- which is switched above.
      <>
        <SideBar />
      </>
    );
  }
}

export default connect(mapStoreToProps)(AdminPage);
