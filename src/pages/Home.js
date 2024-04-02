import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";
import BookList from "../components/Dashboard/BookList";
import CategoryList from "../components/Dashboard/CategoryList";
import SearchBar from "../components/Dashboard/SearchBar";
import useLoadCategories from "../hooks.js/useLoadCategories.js";
import useLoadBooks from "../hooks.js/useLoadBooks.js";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import { useNavigate } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { categories } = useLoadCategories();
  const { books } = useLoadBooks();
  const [category, setCategory] = useState("");
  const [bookList, setBookList] = useState([]);
  // const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (books) {
      setBookList(books);
    }
  }, [books]);

  useEffect(() => {
    if (category) {
      const getCategory = async () => {
        const response = await axios.get(
          `${BACKEND_URL}/categories/${category}`
        );
        const filteredBooks = response.data;
        setBookList(filteredBooks);
      };
      getCategory();
    }
  }, [category, books]);

  // useEffect(() => {
  //   if (!isAuthenticated || !user.email_verified) {
  //     navigate("/onboarding");
  //   }
  // }, []);

  return (
    <div>
      {/* <SearchBar onSearch={(term) => console.log(term)} /> */}
      <SearchBar />
      <CategoryList categories={categories} setCategory={setCategory} />
      <BookList bookList={bookList} />
      <div className="flex gap-4 justify-center items-center my-12">
        <button onClick={() => navigate("/create-newbook")}>
          <AddCircleOutlineRoundedIcon fontSize="large" />
        </button>
        <button onClick={() => navigate("/forum")}>
          <ForumRoundedIcon fontSize="large" />
        </button>
      </div>
    </div>
  );
};

export default Home;
