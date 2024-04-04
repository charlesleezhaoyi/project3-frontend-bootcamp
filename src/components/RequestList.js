import React from "react";
import AcceptRequestButton from "./AcceptRequestButton";

const RequestList = ({ requests }) => {
  console.log(requests);
  const requestDisplay = requests.map((request) => {
    return (
      <li key={request.id}>
        {request.bene.email},{request.status},
        <AcceptRequestButton requesterId={request.beneId} />
      </li>
    );
  });
  return (
    <div className="border rounded-lg p-5 space-y-3">
      <div className="font-semibold text-2xl">All beneficiary's requests:</div>
      <ul>{requestDisplay}</ul>
    </div>
  );
};

export default RequestList;
