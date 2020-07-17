import React from 'react';
import { withRouter } from "react-router";
import firebase from '../firebase';

class ConfirmCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = { code: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async handleSubmit(e) {
    e.preventDefault();
    const { code } = this.state;
    const confirmationResult = this.props.location.state.confirmationResult
    try {
      await confirmationResult.confirm(code)
      this.props.history.push('/');
    } catch (error) {
      alert(error);
    }
  }

  appVerifier = () => {
    new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }

  render() {
    const { code } = this.state;
    return (
      <div>
        <div>
          <label htmlFor="number">Phone Number</label>
          <input id="email" value={code} type="text" onChange={ (e) => this.setState({ code: e.target.value }) } />
        </div>
        <button onClick={this.handleSubmit}>Login</button>
      </div>
    );
  }
};
export default withRouter(ConfirmCode);
