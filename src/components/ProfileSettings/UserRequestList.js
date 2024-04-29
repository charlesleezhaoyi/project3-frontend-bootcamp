import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../constants";
import UserRequestListItem from "./UserRequestListItem";

export default function UserRequestList({ setOpen, setErrorMessage }) {
  const { user, getAccessTokenSilently } = useAuth0();
  const [userRequests, setUserRequests] = useState([]);
  useEffect(() => {
    const getUserRequestsData = async () => {
      try {
        const token = await getAccessTokenSilently();
        const requestRes = await axios.get(
          `${BACKEND_URL}/requests/user/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserRequests(requestRes.data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getUserRequestsData();
  }, [user.email, setErrorMessage, getAccessTokenSilently]);

  return (
    <div className="flex flex-col space-y-2">
      {userRequests.map((request) => (
        <UserRequestListItem
          key={request.donationId}
          request={request}
          setOpen={setOpen}
        />
      ))}
    </div>
  );
}
