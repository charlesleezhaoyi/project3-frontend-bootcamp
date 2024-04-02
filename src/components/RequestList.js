import axios from "axios";
import React, { useEffect, useState } from "react";
import AcceptRequestButton from "./AcceptRequestButton";

const RequestList = ({ book }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/requests/book/${book.id}`
        );
        setRequests(data);
      } catch (error) {
        console.log(error);
        //Need to change later
      }
    };
    getRequests();
  }, [book.id]);

  const requestDisplay = requests.map((request) => {
    return (
      <li key={request.id}>
        {request.bene.email},{request.status},
        <AcceptRequestButton requesterId={request.beneId} />
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
