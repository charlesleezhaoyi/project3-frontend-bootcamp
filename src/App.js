import React, { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import ErrorPopUp from "./components/Common/ErrorPopUp";
import NavBar from "./components/Common/NavBar";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const [errorMessage, setErrorMessage] = useState("");
  const { isAuthenticated, isLoading } = useAuth0();

  return (
    <div className="App">
      <NavBar setErrorMessage={setErrorMessage} />
      <div className="w-full border-t-2 border-gray-800 flex flex-col items-center">
        <Outlet context={[errorMessage, setErrorMessage]} />
      </div>
      <ErrorPopUp
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />

      {!isAuthenticated && !isLoading && (
        <div className="hero min-h-screen ">
          <div className="hero-content flex-col ">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-wider text-left ml-3 text-center">
                Book Donation App
              </h1>
              <p className="ml-3 py-3 text-sm">
                A platform to post and to request a book.
              </p>
              <div>
                <MenuBookTwoToneIcon fontSize="large" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
