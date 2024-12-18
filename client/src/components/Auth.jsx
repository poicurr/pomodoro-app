import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Login from './Login';
import SignUp from './SignUp';

import "./Auth.css"

import axios from 'axios';

function Auth(props) {
  const [isLoginScreen, setIsLoginScreen] = useState(props.isLogin);
  const navigate = useNavigate();

  return (
    <>
      {/* 認証画面 */}
      {isLoginScreen ? (
        <Login
          onLogin={(email, password, failureCallback) => {
            // ログイン処理
            console.log('Logging in:', email, password);
            axios.post('http://localhost:5000/api/auth/login', {
              email: email,
              password: password
            }, {
              withCredentials: true, // クッキーを含めるために必要
            }).then((res) => {
              console.log("Login succeeded");
              navigate('/tasks');
            }).catch(failureCallback)
          }}
          switchToSignUp={() => setIsLoginScreen(false)}
        />
      ) : (
        <SignUp
          onSignUp={(displayName, email, password, failureCallback) => {
            // ユーザー登録処理
            console.log('Signing up:', displayName, email, password);
            axios.post('http://localhost:5000/api/auth/signup', {
              displayName: displayName,
              email: email,
              password: password,
              avatar: "",
            }, {
              withCredentials: true, // クッキーを含めるために必要
            }).then((res) => {
              console.log("Sign up succeeded");
              navigate('/tasks');
            }).catch(failureCallback);
          }}
          switchToLogin={() => setIsLoginScreen(true)}
        />
      )}
    </>
  );
}

export default Auth;
