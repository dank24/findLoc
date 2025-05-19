import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import RoutesN from "./routes";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";
import AdminDash from "./pages/adminPage";
import UserContextProvider from "./context/userContext";

const App = () => {

 

  // UI
  return(
    <main id="app_main_cont">
        
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
              <Route path="/signup" element={< Signup />}></Route>
              <Route path="/login" element={< Login />}></Route>
              <Route path="/home/:userId?" element={< Home />}></Route>
              <Route path="/admin" element={< AdminDash />}></Route>
          </Routes>
      </UserContextProvider>
    </BrowserRouter>

    </main>
  )
}

export default App