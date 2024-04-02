import { useState, useEffect } from "react";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";

const useLoadRequests = ({ bookId }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const res = await axios.get(`${BACKEND_URL}/requests/book/${bookId},`);
      const booksData = res.data;
      setRequests(booksData);
    };

    fetchRequests();
  }, []);

  return { requests };
};

export default useLoadRequests;
