import { useState, useEffect } from "react";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const useLoadBooks = () => {
  const [books, setBooks] = useState([]);
  const [refreshBooks, setRefreshBooks] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchBooks = async () => {
      const token = await getAccessTokenSilently();
      const res = await axios.get(`${BACKEND_URL}/books/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("here");
      const booksData = res.data;
      setBooks(booksData);
      setRefreshBooks(false);
    };
    if (refreshBooks) {
      fetchBooks();
    }
  }, [getAccessTokenSilently, refreshBooks]);

  return { books, setRefreshBooks };
};

export default useLoadBooks;
