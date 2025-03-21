import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import RoutesN from "./routes";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";


const App = () => {



  // UI
  return(
    <main>
        
    <BrowserRouter>
        <Routes>
            <Route path="/signup" element={< Signup />}></Route>
            <Route path="/login" element={< Login />}></Route>
            <Route path="/home/:userId?" element={< Home />}></Route>
        </Routes>
    </BrowserRouter>

    </main>
  )
}

export default App