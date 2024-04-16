import { Link } from "react-router-dom";
import { STATUS_STYLE } from "../../constants";

export default function UserRequestListItem({ request, setOpen }) {
  return (
    <Link
      to={`/books/${request.donation.bookId}`}
      className="btn flex justify-between"
      onClick={() => setOpen(false)}
    >
      {request.donation.book.title}
      <div className={`${STATUS_STYLE[request.status]} `}>{request.status}</div>
    </Link>
  );
}
