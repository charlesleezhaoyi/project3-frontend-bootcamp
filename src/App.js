import React, { useEffect, useState } from "react";
import "./App.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ErrorPopUp from "./components/Common/ErrorPopUp";
import NavBar from "./components/Common/NavBar";
function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
    }
  }, [location, navigate]);

  return (
    <div className="App">
      {!location.pathname.includes("forum") && (
        <NavBar setErrorMessage={setErrorMessage} />
      )}
      <Outlet context={[errorMessage, setErrorMessage]} />
      <ErrorPopUp
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
}

export default App;
