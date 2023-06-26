import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import Header from './components/Header';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Capsules from "./pages/Capsules";
import Launches from "./pages/Launches";
import SingleLaunch from "./pages/SingleLaunch";
import Rockets from "./pages/Rockets";
import Moon from "./pages/Moon.js";



function App() {
    return (
        <>
            <Header />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/moon" element={<Moon />} />
                <Route path="/capsules" element={<Capsules />} />
                <Route path="/launches" element={<Launches />} />
                <Route path="/launches/:id" element={<SingleLaunch/>} />
                <Route path="/rockets" element={<Rockets/>} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Error />} />
            </Routes>

        </>
    );
}

export default App;