import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import AccountControl from '../AdminSubComponents/AccountControl';
import EventControl from '../AdminSubComponents/EventControl';
import Statistics from '../AdminSubComponents/Statistics';
import Verification from '../AdminSubComponents/Verification';
import Welcome from '../AdminSubComponents/Welcome';
import SideBar from '../AdminSidebar/Sidebar';

class AdminPage extends Component {
  state = {
    //access_level gets passed down to the sidebar to determine which tabs/options are selectable/displayed
    access_level: null,
    //selection changes the display switch to the proper component
    selection: null,
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
      type: 'getUsers',
    });
    this.props.dispatch({
      type: 'getUsers',
    });
    this.setState({
      ...this.state,
      access_level: this.props.store.user.access_level_id,
    });
  }
  render() {
    let display = null;
    switch (this.state.selection) {
      case 1:
        display = <AccountControl />;
        break;
      case 2:
        display = <EventControl />;
        break;
      case 3:
        display = <Verification />;
        break;
      case 4:
        display = <Statistics />;
        break;
      default:
        display = <Welcome />;
        break;
    }
    return (
      //displays the navigation, sidebar menu, and {display} <- which is switched above.
      <>
        <div className="adminPage">
          <SideBar
            access={this.state.access_level}
            handleSidebar={this.handleSidebar}
          />
          {display}
        </div>
      </>
    );
  }
}

export default connect(mapStoreToProps)(AdminPage);
