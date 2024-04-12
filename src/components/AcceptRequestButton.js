import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function AcceptRequestButton({
  requesterId,
  disabled,
  setErrorMessage,
}) {
  const { getAccessTokenSilently } = useAuth0();
  const { bookId } = useParams();
  const handleSubmit = async () => {
    try {
      const token = await getAccessTokenSilently();
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/requests/accept`,
        {
          beneId: requesterId,
          bookId: bookId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      window.location.reload();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  return (
    <button
      className="btn btn-success"
      disabled={disabled}
      onClick={handleSubmit}
    >
      Accept
    </button>
  );
}
