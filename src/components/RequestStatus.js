import axios from "axios";
import { BACKEND_URL, STATUS_STYLE } from "../constants";
import { useAuth0 } from "@auth0/auth0-react";

export default function RequestStatus({ request, setErrorMessage }) {
  const { getAccessTokenSilently } = useAuth0();
  const handleChangeStatus = async (status) => {
    try {
      const token = await getAccessTokenSilently();
      await axios.put(
        `${BACKEND_URL}/requests/status`,
        {
          donationId: request.donationId,
          beneId: request.beneId,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  const cancellButtonRow = request.status === "pending" && (
    <button
      className={`btn btn-error`}
      onClick={() => handleChangeStatus("cancelled")}
    >
      Cancell
    </button>
  );
  const collectButtonRow = request.status === "accepted" && (
    <button
      className="btn btn-success"
      onClick={() => handleChangeStatus("collected")}
    >
      Collected
    </button>
  );
  return (
    <div className="p-3">
      You have already request this book.
      <table className="table border-2 border-neutral m-2">
        <tbody>
          <tr>
            <th>Status:</th>
            <td>
              <span className={STATUS_STYLE[request.status]}>
                {request.status}
              </span>
            </td>
          </tr>
          <tr>
            <th>Content:</th>
            <td>{request.content}</td>
          </tr>
          <tr>
            <th>Request Date:</th>
            <td>{request.createdAt.slice(0, 10)}</td>
          </tr>
        </tbody>
      </table>
      {cancellButtonRow}
      {collectButtonRow}
    </div>
  );
}
