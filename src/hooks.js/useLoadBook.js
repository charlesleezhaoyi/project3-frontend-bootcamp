import { useState, useEffect } from "react";
import { BACKEND_URL } from "../constants.js";
import { useParams } from "react-router-dom";

import axios from "axios";

const useLoadBook = ({ id }) => {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await axios.get(`${BACKEND_URL}/books/${id}`);
      const bookData = res.data;
      setBook(bookData);
    };

    fetchBook();
  }, []);

  return { book };
};

export default useLoadBook;
