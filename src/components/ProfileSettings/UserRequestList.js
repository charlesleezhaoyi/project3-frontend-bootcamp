import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../constants";
import { Link } from "react-router-dom";

export default function UserRequestList({ setOpen, setErrorMessage }) {
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
    <div className="flex flex-col">
      {userRequests &&
        userRequests.map((request, index) => (
          <Link
            to={`/books/${request.donation.bookId}`}
            key={index}
            className="mt-2 p-4 bg-white rounded-xl shadow-md"
            onClick={() => setOpen(false)}
          >
            {request.donation.book.title}
          </Link>
        ))}
    </div>
  );
}
