import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const loginAndRedirect = async () => {
    await loginWithRedirect();
  };

  return (
    <button className="btn bg-gray-800 text-white" onClick={loginAndRedirect}>
      Log In / Register
    </button>
  );
};

export default LoginButton;
