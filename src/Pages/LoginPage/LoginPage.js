import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import LoginForm from '../../components/LoginForm/LoginForm';

//Need to select mentor or volunteer and display page based on selection
//Need to redirect to login once form is complete

class LoginPage extends Component {
  render() {
    return (
      <div>
        <LoginForm />
        <center>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              this.props.history.push('/registration/mentor/page/1');
            }}
          >
            Register
          </button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LoginPage);
