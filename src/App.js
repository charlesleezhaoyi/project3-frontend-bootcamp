import React, { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import ErrorPopUp from "./components/Common/ErrorPopUp";
import NavBar from "./components/Common/NavBar";
function App() {
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div className="App">
      <NavBar setErrorMessage={setErrorMessage} />
      <Outlet context={[errorMessage, setErrorMessage]} />
      <ErrorPopUp
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
}

export default App;
