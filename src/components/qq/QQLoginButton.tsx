import React from 'react';
import axios from 'axios';

const QQLoginButton = () => {
  const clientId = '102055926';
  const redirectUri = 'https://yychuiyan.com/rblog/home';
  const encoded_redirect_uri = encodeURIComponent(redirectUri);
  const scope = 'get_user_info'
  const loginUrl = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encoded_redirect_uri}&scope=${scope}&state=test`;
  const handleLogin = () => {
    window.location.href = loginUrl;
  };

  return (
    <div onClick={handleLogin}><img src={`https://op.yychuiyan.com/qq_login.webp`} style={{ width: '60px', cursor: 'pointer' }} /></div>
  );
};

export default QQLoginButton;
