import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { Auth, Hub } from 'aws-amplify';

function checkUser() {
  Auth.currentAuthenticatedUser()
    .then(user => console.log({ user }))
    .catch(err => console.log(err))
}

function signOut() {
  Auth.signOut()
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

function App() {
  useEffect(() => {
    Hub.listen('auth', (data) => {
      const { payload } = data
      console.log('A new auth event has happened: ', data)
      if (payload.event === 'signIn') {
        console.log('a user has signed in!')
      }
      if (payload.event === 'signOut') {
        console.log('a user has signed out!')
      }
    })
  }, [])
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => Auth.federatedSignIn()}>Sign In</button>
        <button
          onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })}
        >Sign In with Facebook</button>

        <button
          onClick={() => Auth.federatedSignIn({ provider: 'Google' })}
        >Sign In with Google</button>
        <button onClick={checkUser}>Check User</button>
        <button onClick={signOut}>Sign Out</button>
      </header>
    </div>
  );
}

export default App;
