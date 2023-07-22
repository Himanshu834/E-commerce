import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResetPassword from './reset/index';


function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/resetpassword/:token' element={<ResetPassword/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;