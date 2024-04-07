import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../constants";

export default function UserRequestList({ setErrorMessage }) {
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [userRequests, setUserRequests] = useState([]);
  useEffect(() => {
    const getUserRequestsData = async () => {
      try {
        const requestRes = await axios.get(
          `${BACKEND_URL}/requests/user/${user.email}`
        );
        setUserRequests(requestRes.data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getUserRequestsData();
  }, [user.email, setErrorMessage]);

  return (
    <div>
      {userRequests &&
        userRequests.map((request, index) => (
          <div key={index} className="mt-2 p-4 bg-white rounded-xl shadow-md">
            {request.donation.book.title}
          </div>
        ))}
    </div>
  );
}
