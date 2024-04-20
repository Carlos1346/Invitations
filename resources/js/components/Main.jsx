import React from 'react';
import Menu from "./Menu";
import Example from "./Example";
import { Routes, Route, Navigate } from 'react-router-dom';

import AuthPage from './AuthPage';

function Main (){
    return(        
        <Routes>
        <Route path="/INVITATIONS/example-app/public/"
                  element={<Menu />}>
            {/* <Route index element={<Home /> } /> */}
            <Route path="listcard" element={<AuthPage /> } />
            
            
            
          <Route path="*" 
              element={<Navigate replace to="/INVITATIONS/example-app/public" />} />
        </Route>         
             
      </Routes>

        
    )
}

export default Main;
