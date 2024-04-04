const statusStyle = {
  pending: "bg-base-300",
  accepted: "bg-success",
  rejected: "bg-error",
  cancelled: "bg-warning",
  collected: "bg-success",
};

export default function RequestStatus({ request }) {
  return (
    <div className="p-5">
      You have already request this book.
      <table className="table border-2 border-neutral">
        <tbody>
          <tr>
            <th>Status:</th>
            <td>
              <span
                className={`p-2 text-sm rounded ${statusStyle[request.status]}`}
              >
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
    </div>
  );
}
