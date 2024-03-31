import React from "react";
import "./App.css";
import { Outlet } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div className="p-10 text-center text-2xl">
        <Outlet />
        Welcome to Book Donation App
      </div>
    );
  }
}

export default App;
