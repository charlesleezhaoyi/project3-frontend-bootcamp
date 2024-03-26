import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const loginAndRedirect = async () => {
    await loginWithRedirect();
  };

  return (
    <button className="btn btn-primary" onClick={loginAndRedirect}>
      Log In
    </button>
  );
};

export default LoginButton;
