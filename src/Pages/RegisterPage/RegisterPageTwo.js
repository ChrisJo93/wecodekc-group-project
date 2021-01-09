import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// CUSTOM COMPONENTS
import RegisterFormPage2 from '../../components/RegisterForm/RegisterFormPageTwo';

class RegisterPageTwo extends Component {
  state = {};

  componentDidMount() {
    //dispatch to get all education levels for dropdown
    this.props.dispatch({ type: 'GET_SKILL' });
    this.props.dispatch({ type: 'GET_TIME' });
    this.props.dispatch({ type: 'GET_LANGUAGE' });
  }

  render() {
    return (
      <div>
        <RegisterFormPage2 />
        <center>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              this.props.history.push('/login');
            }}
          >
            Login
          </button>
        </center>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(RegisterPageTwo);
