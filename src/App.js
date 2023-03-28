import React from 'react';
import './App.css';

import { Routes, Route, Navigate } from 'react-router-dom';

import Main from './components/main';
import Add from './add';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


const DMain = () =>{
  return(
    <div className='text-center' >
      <h1 className='font-bold text-xl'>Hotels Search</h1>
      <Main />
    </div>
  )
}

const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigate to = '/home' />} />

        <Route path='/home' element={ <DMain /> } />

        <Route path='/add' element={ <Add /> } />

      </Routes>
    </div>
  );
}

export default App;
