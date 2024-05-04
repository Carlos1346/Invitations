import React from 'react';
import LoginNavbar from '../components/LoginNavbar';
import LoginCarousel from '../components/LoginCarousel';
import LoginFooter from '../components/LoginFooter';
import Theme from '../components/Theme';



function LoginPage() {
  return (
    <div>
      <div >
        <LoginNavbar />               
        <LoginCarousel />
        <LoginFooter />
      </div>
    </div>
  );
}

export default LoginPage;
