import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constants";
import Loading from "./Common/Loading";

function AuthWrapper({ children }) {
  const {
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // If the user is not authenticated, we start the login process
        loginWithRedirect();
      } else if (
        isAuthenticated &&
        user &&
        user.email &&
        !user.email.verified
      ) {
        // If the user is authenticated, we send their data to our API
        const sendData = async () => {
          const token = await getAccessTokenSilently();
          axios.post(
            `${BACKEND_URL}/users`,
            {
              email: user.email,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        };

        sendData();
      }
    }
  }, [
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    user,
    getAccessTokenSilently,
  ]);

  if (isLoading) {
    return <Loading />;
  }

  return isAuthenticated ? children : null;
}

export default AuthWrapper;
