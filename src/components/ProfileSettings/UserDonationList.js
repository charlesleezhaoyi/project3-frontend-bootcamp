import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../constants";
import UserDonationListItem from "./UserDonationListItem";

export default function UserDonationList({ setOpen, setErrorMessage }) {
  const { user, getAccessTokenSilently } = useAuth0();
  const [userDonations, setUserDonations] = useState([]);

  useEffect(() => {
    const getUserDonationsData = async () => {
      try {
        const donationsRes = await axios.get(
          `${BACKEND_URL}/donations/user/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${await getAccessTokenSilently()}`,
            },
          }
        );
        setUserDonations(donationsRes.data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getUserDonationsData();
  }, [user.email, setErrorMessage, getAccessTokenSilently]);

  return (
    <div className="flex flex-col space-y-2">
      {userDonations.map((donation) => (
        <UserDonationListItem
          key={donation.bookId}
          donation={donation}
          setOpen={setOpen}
        />
      ))}
    </div>
  );
}
