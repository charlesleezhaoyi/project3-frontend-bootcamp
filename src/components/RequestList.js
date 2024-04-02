import React from "react";
import useLoadRequests from "../hooks.js/useLoadRequests";

const RequestList = ({ book }) => {
  const { requests } = useLoadRequests(book.id);

  console.log(requests);
  const allRequests = requests.map((item) => {
    return (
      <>
        <div>{item}</div>
      </>
    );
  });

  console.log(allRequests);
  return (
    <>
      <form className="border rounded-lg p-5 space-y-3">
        <div className="font-semibold text-2xl">
          All beneficiary's requests for {book.title} by {book.author}
          {allRequests}
        </div>
      </form>
    </>
  );
};

export default RequestList;
