import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import axios from "axios";

function AuthWrapper({ children }) {
  const { isAuthenticated, isLoading, loginWithRedirect, user } = useAuth0();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // If the user is not authenticated, we start the login process
        loginWithRedirect();
      } else if (isAuthenticated && !user.email.verified) {
        // If the user is authenticated, we send their data to our API
        axios.post("http://localhost:3000/users/", {
          userEmail: user.email,
        });
      }
    }
  }, [isAuthenticated, isLoading, loginWithRedirect, user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : null;
}

export default AuthWrapper;
