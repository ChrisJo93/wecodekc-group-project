import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

// CUSTOM COMPONENTS
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import RegisterFormPage2 from '../../components/RegisterForm/RegisterFormPageTwo';

class RegisterPage extends Component {
  state = {};

  render() {
    return (
      <div>
        {/* {this.state.backClicked ? <RegisterForm /> : <RegisterFormPage2 />} */}
        <RegisterForm />
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

export default connect(mapStoreToProps)(RegisterPage);
