import React from 'react';
import { withRouter } from "react-router";
import firebase from 'firebase';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number_phone: ''};
    this.handleLogin = this.handleLogin.bind(this);
    this.signInPhoneNumber = this.signInPhoneNumber.bind(this);
  }

  async handleLogin(e) {
    e.preventDefault();
    const { number_phone } = this.state;
    try {
      await this.signInPhoneNumber(number_phone)
    } catch (error) {
      alert(error);
    }
  }

  componentDidMount(){
    firebase.auth().languageCode = 'vi';
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'normal',
      'callback': function(response) {
      }
    });
  }

  signInPhoneNumber = (number_phone) => {
    const history = this.props.history
    firebase.auth().signInWithPhoneNumber(number_phone, window.recaptchaVerifier).then(function (confirmationResult) {
      console.log(confirmationResult)
      history.pushState({ confirmationResult: confirmationResult }, '', '/ConfirmCode');
    }).catch(function (error) {
      console.log(error)
    });
  }

  render() {
    const { number_phone } = this.state;
    return (
      <div>
        <div id="recaptcha-container"></div>
        <div>
          <label htmlFor="number">Phone Number</label>
          <input id="email" value={number_phone} type="text" onChange={ (e) => this.setState({ number_phone: e.target.value }) } />
        </div>
        <button onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
};
export default withRouter(Login);
