import { useState, useEffect } from "react";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";

const useLoadBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get(`${BACKEND_URL}/books`);
      const booksData = res.data;
      setBooks(booksData);
    };

    fetchBooks();
  }, []);

  return { books };
};

export default useLoadBooks;
