import axios from "axios";
import { useParams } from "react-router-dom";

export default function AcceptRequestButton({
  requesterId,
  disabled,
  setErrorMessage,
}) {
  const { bookId } = useParams();
  const handleSubmit = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/requests/accept`, {
        beneId: requesterId,
        bookId: bookId,
      });
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
