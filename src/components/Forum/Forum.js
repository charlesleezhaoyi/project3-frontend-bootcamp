import { Outlet, useOutletContext } from "react-router-dom";
import ForumNavBar from "./ForumNavBar";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Common/Loading";
export default function Forum() {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
  const [errorMessage, setErrorMessage] = useOutletContext();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  return isLoading || !isAuthenticated ? (
    <Loading />
  ) : (
    <div className="w-full flex flex-col items-center">
      <ForumNavBar />
      <Outlet context={[errorMessage, setErrorMessage]} />
    </div>
  );
}
