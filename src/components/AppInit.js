import React, { Component } from 'react';
import firebase from '@firebase/app';
import '@firebase/auth'
import Main from './Main';
import { alreadyLogin, notLoginYet } from '../actions'
import { connect } from 'react-redux'
class AppInit extends Component {


  componentDidMount() {
    // Initialize Firebase
    var config = {
    apiKey: "AIzaSyBicqDXWN_l1vEpqIk7ri179azHkO65TeA",
    authDomain: "instaton-939fe.firebaseapp.com",
    databaseURL: "https://instaton-939fe.firebaseio.com",
    projectId: "instaton-939fe",
    storageBucket: "instaton-939fe.appspot.com",
    messagingSenderId: "565005578787"
    };
    if (firebase.apps.length === 0) {
      firebase.initializeApp(config);
    }


    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.alreadyLogin(user);
      } else {
        this.props.notLoginYet();
      }
    });
  }

  render() {
    return (
      <Main />
    );
  }
}
export default connect(null, { alreadyLogin, notLoginYet })(AppInit);