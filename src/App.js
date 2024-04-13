import React, { useEffect, useState } from "react";
import "./App.css";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
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
      <NavBar setErrorMessage={setErrorMessage} />
      <div className="w-full border-t-2 border-primary flex flex-col items-center">
        <Outlet context={[errorMessage, setErrorMessage]} />
      </div>
      <ErrorPopUp
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />

      {/* <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Book Donation</h1>

            <button className="btn btn-primary">Login</button>
          </div>
        </div>
      </div>*/}
    </div>
  );
}

export default App;
