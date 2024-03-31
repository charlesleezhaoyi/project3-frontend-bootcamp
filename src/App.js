import React, { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import ErrorPopUp from "./components/Common/ErrorPopUp";

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <div className="App">
      <Outlet context={[errorMessage, setErrorMessage]} />
      <ErrorPopUp
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
}

export default App;
