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
      <div className="w-full border-t-2 border-primary">
        <Outlet context={[errorMessage, setErrorMessage]} />
      </div>
      <ErrorPopUp
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
}

export default App;
