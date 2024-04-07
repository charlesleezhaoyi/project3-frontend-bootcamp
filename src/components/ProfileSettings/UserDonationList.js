import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../constants";
import { Link } from "react-router-dom";

export default function UserDonationList({ setOpen, setErrorMessage }) {
  const { user } = useAuth0();
  const [userDonations, setUserDonations] = useState([]);

  useEffect(() => {
    const getUserDonationsData = async () => {
      try {
        const donationsRes = await axios.get(
          `${BACKEND_URL}/donations/user/${user.email}`
        );
        setUserDonations(donationsRes.data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getUserDonationsData();
  }, [user.email, setErrorMessage]);

  return (
    <div className="flex flex-col">
      {userDonations &&
        userDonations.map((donation, index) => (
          <Link
            to={`/books/${donation.bookId}`}
            key={index}
            className="mt-2 p-4 bg-white rounded-xl shadow-md"
            onClick={() => setOpen(false)}
          >
            {donation.book.title}
          </Link>
        ))}
    </div>
  );
}
