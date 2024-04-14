import React, { useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import ErrorPopUp from "./components/Common/ErrorPopUp";
import NavBar from "./components/Common/NavBar";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import { useAuth0 } from "@auth0/auth0-react";
import FirstPage from "./pages/FirstPage";

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

      {!isAuthenticated && !isLoading && <FirstPage />}
    </div>
  );
}

export default App;
