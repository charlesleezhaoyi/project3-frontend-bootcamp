import React from "react";
import AcceptRequestButton from "./AcceptRequestButton";
import OutputUserName from "../components/Common/OutputUserName";
import { STATUS_STYLE } from "../constants";

const sortingRef = {
  accepted: 1,
  collected: 1,
  pending: 2,
  cancelled: 3,
  rejected: 4,
};

const RequestList = ({ requests, setErrorMessage }) => {
  requests.sort((a, b) => sortingRef[a.status] - sortingRef[b.status]);
  const isAllButtonDisabled =
    requests[0].status === "accepted" || requests[0].status === "collected";
  const requestDisplay = requests.map((request) => {
    const requesterName = OutputUserName(request.bene);
    const isButtonDisabled =
      isAllButtonDisabled ||
      request.status === "rejected" ||
      request.status === "cancelled";
    return (
      <div
        className="p-2 flex flex-col border-b-2 last:border-0 border-neutral"
        key={request.beneId}
      >
        <div className="flex justify-between mb-2">
          <b className="text-lg">{requesterName}:</b>
          <b className={`p-2 text-sm rounded ${STATUS_STYLE[request.status]}`}>
            {request.status}
          </b>
        </div>
        <div className="flex justify-between items-center space-x-10">
          <div className="border-accent border-2 rounded w-full h-32 sm:h-20 overflow-y-scroll">
            <p className="p-2 text-left">{request.content}</p>
          </div>
          <AcceptRequestButton
            requesterId={request.beneId}
            disabled={isButtonDisabled}
            setErrorMessage={setErrorMessage}
          />
        </div>
      </div>
    );
  });
  return (
    <div className="border rounded-lg p-5 space-y-3">
      <div className="font-semibold text-2xl">All beneficiary's requests:</div>
      <div className="border-2 border-neutral rounded">{requestDisplay}</div>
    </div>
  );
};

export default RequestList;
