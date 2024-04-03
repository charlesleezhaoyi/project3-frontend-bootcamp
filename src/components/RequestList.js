import React from "react";
import AcceptRequestButton from "./AcceptRequestButton";

const RequestList = ({ book, requests }) => {
  const requestDisplay = requests.map((request) => {
    return (
      <li key={request.id}>
        {request.bene.email},{request.status},
        <AcceptRequestButton requesterId={request.beneId} bookId={book.id} />
      </li>
    );
  });
  return (
    <>
      <form className="border rounded-lg p-5 space-y-3">
        <div className="font-semibold text-2xl">
          All beneficiary's requests for {book.title} by {book.author}
        </div>
        <ul>{requestDisplay}</ul>
      </form>
    </>
  );
};

export default RequestList;
