import React from 'react';
import axios from 'axios';

const QQLoginButton = () => {
  const clientId = '102055926';
  const redirectUri = 'https://yychuiyan.com/rblog/login';
  const scope = 'get_user_info'
  const loginUrl = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
  const handleLogin = () => {
    window.location.href = loginUrl;
  };

  return (
    <div onClick={handleLogin}><img src={`https://op.yychuiyan.com/qq_login.webp`} style={{ width: '60px', cursor: 'pointer' }} /></div>
  );
};

export default QQLoginButton;
