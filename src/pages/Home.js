import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";
import NavBar from "../components/Common/NavBar";
import BookList from "../components/Dashboard/BookList";
import CategoryList from "../components/Dashboard/CategoryList";
import SearchBar from "../components/Dashboard/SearchBar";
import useLoadCategories from "../hooks.js/useLoadCategories.js";
import useLoadBooks from "../hooks.js/useLoadBooks.js";
import Button from "../components/Common/Button.js";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { categories } = useLoadCategories();
  const { books } = useLoadBooks();
  const [category, setCategory] = useState("");
  const [bookList, setBookList] = useState([]);
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (books) {
      setBookList(books);
    }
  }, [books]);

  useEffect(() => {
    if (category) {
      const getCategory = async () => {
        const res = await axios.get(`${BACKEND_URL}/categories/${category}`);
        const filteredBooks = res.data;
        setBookList(filteredBooks);
      };
      getCategory();
    }
  }, [category, books]);

  useEffect(() => {
    //console.log(isAuthenticated, user.email_verified);
    if (!isAuthenticated || !user.email_verified) {
      navigate("/onboarding");
    }
  }, []);

  return (
    <div>
      <NavBar />
      <SearchBar onSearch={(term) => console.log(term)} />
      <CategoryList categories={categories} setCategory={setCategory} />
      <BookList bookList={bookList} />
      <div className="flex gap-4 justify-center items-center">
        <Button
          label="Post a new book"
          onClick={() => navigate("/create-newbook")}
        />
      </div>
    </div>
  );
};

export default Home;
