import React from 'react';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedLayout } from './components/ProtectedLayout';
import { Signin } from './components/Signin';
import { Profile } from './components/Profile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/profile' element={<ProtectedLayout><Profile /></ProtectedLayout>} />
          <Route path='' element={<Signin />}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>  
  );
}

export default App;
