export default function RequestStatus({ request }) {
  return (
    <div className="p-5">
      You have already request this book.
      <table className="table border-2 border-neutral">
        <tbody>
          <tr>
            <th>Status:</th>
            <td>{request.status}</td>
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
