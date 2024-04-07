import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../constants";

export default function UserDonationList({ setErrorMessage }) {
  const navigate = useNavigate();
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
    <div>
      {userDonations &&
        userDonations.map((donation, index) => (
          <div
            key={index}
            className="mt-2 p-4 bg-white rounded-xl shadow-md"
            onClick={() => navigate(`/books/${donation.id}`)}
          >
            {donation.book.title}
          </div>
        ))}
    </div>
  );
}
