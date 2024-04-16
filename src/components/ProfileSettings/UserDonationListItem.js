import { Link } from "react-router-dom";
import { STATUS_STYLE } from "../../constants";

export default function UserDonationListItem({ donation, setOpen }) {
  const acceptedRequest = donation.requests.find(
    (request) => request.status === "accepted" || request.status === "collected"
  );
  const pendingRequests = donation.requests.filter(
    (request) => request.status === "pending"
  );
  return (
    <Link
      to={`/books/${donation.bookId}`}
      className="btn flex justify-between"
      onClick={() => setOpen(false)}
    >
      {donation.book.title}
      {acceptedRequest ? (
        <div className={`${STATUS_STYLE[acceptedRequest.status]} `}>
          {acceptedRequest.status}
        </div>
      ) : (
        <div>Pending Request: {pendingRequests.length}</div>
      )}
    </Link>
  );
}
