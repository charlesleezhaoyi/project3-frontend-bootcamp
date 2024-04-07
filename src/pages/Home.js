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
import Loading from "../components/Common/Loading.js";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../components/Common/NavBar.js";

const Home = () => {
  const [errorMessage, setErrorMessage] = useState("");
  // const [errorMessage, setErrorMessage] = useOutletContext();
  const { categories } = useLoadCategories();
  const { books } = useLoadBooks();
  const [category, setCategory] = useState(null);
  const [bookList, setBookList] = useState([]);
  const { isAuthenticated, user } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (books) {
      setBookList(books);
    }
  }, [books]);

  useEffect(() => {
    if (!isAuthenticated || !user.email_verified) {
      navigate("/onboarding");
    }
  }, []);

  const handleChangeCategory = async (categoryName) => {
    try {
      setBookList(null);
      setCategory(categoryName);
      const response = await axios.get(
        `${BACKEND_URL}/books/category/${categoryName}`
      );
      const filteredBooks = response.data;
      setBookList(filteredBooks);
    } catch (error) {
      // setErrorMessage(error.message);
    }
  };

  return (
    <div className="w-full text-center flex flex-col items-center">
      {/* <SearchBar onSearch={(term) => console.log(term)} /> */}
      <SearchBar />
      {categories ? (
        <div>
          <CategoryList
            categories={categories}
            handleChangeCategory={handleChangeCategory}
          />
          <BookList bookList={bookList} />
        </div>
      ) : (
        <Loading />
      )}
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
