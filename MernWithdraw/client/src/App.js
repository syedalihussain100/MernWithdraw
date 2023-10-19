import React from 'react';
import './App.css';
import Register from './components/User/Register';
import Login from './components/User/Login';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react';
import Home from './components/Home/Home';
import MyHome from "./components/Home/MyHome";
import { PrivateRoutes } from './routes/PrivateRoutes';
import { OpenRoutes } from './routes/OpenRoutes';
import Video from './components/Video/Video';
import Profile from './components/User/Profile';
import Wallet from './components/Wallet/Wallet';
import WithDraw from "./components/Wallet/WithDraw";
import Team from './components/Team/Team';
import Invite from './components/Invite/Invite';
import AcceptInvite from './components/Invite/AcceptInvite';


function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<OpenRoutes><Register /></OpenRoutes>} />
          <Route path='/login' element={<OpenRoutes><Login /></OpenRoutes>} />
          <Route path='/' element={<PrivateRoutes><Home /></PrivateRoutes>} />
          <Route path='/home' element={<PrivateRoutes><MyHome /></PrivateRoutes>} />
          <Route path='/video' element={<PrivateRoutes><Video /></PrivateRoutes>} />
          <Route path='/profile' element={<PrivateRoutes><Profile /></PrivateRoutes>} />
          <Route path='/wallet' element={<PrivateRoutes><Wallet /></PrivateRoutes>} />
          <Route path='/withdraw' element={<PrivateRoutes><WithDraw /></PrivateRoutes>} />
          <Route path='/team' element={<PrivateRoutes><Team /></PrivateRoutes>} />
          <Route path='/invite' element={<PrivateRoutes><Invite /></PrivateRoutes>} />
          <Route path='/accept-invite/:id' element={<PrivateRoutes><AcceptInvite /></PrivateRoutes>} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
