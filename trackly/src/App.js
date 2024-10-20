import './App.css';

import { Routes, Route, BrowserRouter } from "react-router-dom";


import Login from './pages/login/Login'
import Home from './pages/home/Home'
import NoPage from './pages/noPage/NoPage'
import SignUp from './pages/signup/SignUp'
import AddBus from './pages/add-bus/AddBus';
import Profile from './pages/profile/Profile';

import { PanelControlProvider } from './contexts/global/PanelControlContext';
import { AddBusProvider } from './contexts/driver/AddBusContext'



function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<PanelControlProvider><Home /></PanelControlProvider>} />
            <Route path="/login"  element={<Login />} />
            <Route path="/signup"  element={<SignUp />} />
            <Route path="/add-bus"  element={<AddBusProvider><AddBus /></AddBusProvider>} />
            <Route path="/profile"  element={<AddBusProvider><Profile /></AddBusProvider>} />
            <Route path="*" element={<NoPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
