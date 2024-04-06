import React, { useState } from "react";
import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import ErrorPopUp from "./components/Common/ErrorPopUp";
import NavBar from "./components/Common/NavBar";
function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  return (
    <div className="App">
      {!location.pathname.includes("forum") && <NavBar />}
      <Outlet context={[errorMessage, setErrorMessage]} />
      <ErrorPopUp
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
}

export default App;
