import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Signup from "./pages/signup";
import Login from "./pages/login";

const RoutesN = () =>{

    <BrowserRouter>
        <Routes>
            <Route path="/signup" element={< Signup />}></Route>
            <Route path="/login" element={< Login />}></Route>
        </Routes>
    </BrowserRouter>

}

export default RoutesN