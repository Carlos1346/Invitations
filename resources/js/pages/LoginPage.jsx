import React from 'react';
import LoginNavbar from '../components/LoginNavbar';
import LoginCarousel from '../components/LoginCarousel';
import LoginFooter from '../components/LoginFooter';


function LoginPage() {
  return (
    <div>
      <div style={{
        backgroundImage: "url('https://fondosmil.co/fondo/36833.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',

      }} >
        <LoginNavbar />
        <LoginCarousel />
        <LoginFooter />
      </div>
    </div>
  );
}

export default LoginPage;
