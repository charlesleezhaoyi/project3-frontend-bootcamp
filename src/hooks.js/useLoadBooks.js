import { useState, useEffect } from "react";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const useLoadBooks = () => {
  const [books, setBooks] = useState([]);
  const { getAccessTokenSilently, loginWithRedirect } = useAuth0();

  useEffect(() => {
    const fetchBooks = async () => {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: process.env.REACT_APP_AUDIENCE,
        },
      });

      console.log(token);
      const res = await axios.get(`${BACKEND_URL}/books/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const booksData = res.data;
      setBooks(booksData);
    };

    fetchBooks();
  }, [getAccessTokenSilently]);

  return { books };
};

export default useLoadBooks;
