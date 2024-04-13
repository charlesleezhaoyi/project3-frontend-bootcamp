import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";
import BookList from "../components/Dashboard/BookList";
import CategoryList from "../components/Dashboard/CategoryList";
import SearchBar from "../components/Dashboard/SearchBar";
import useLoadCategories from "../hooks.js/useLoadCategories.js";
import useLoadBooks from "../hooks.js/useLoadBooks.js";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import { useNavigate, useOutletContext } from "react-router-dom";
import Loading from "../components/Common/Loading.js";
import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "../components/LogoutButton.js";

const Home = () => {
  const [, setErrorMessage] = useOutletContext();
  const { categories } = useLoadCategories();
  const { books } = useLoadBooks();
  const [category, setCategory] = useState(null);
  const [bookList, setBookList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
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
      const token = await getAccessTokenSilently();
      setBookList(null);
      setCategory(categoryName);
      const response = await axios.get(
        `${BACKEND_URL}/books/category/${categoryName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const filteredBooks = response.data;
      setBookList(filteredBooks);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get(
      `${BACKEND_URL}/books/search?${searchParams.toString()}`
    );
    const filteredBooks = response.data;

    setBookList(filteredBooks);
  };

  return (
    <div className="grid grid-cols-5 w-screen">
      <div className="col-start-2 col-span-3 ">
        <SearchBar
          setSearchParams={setSearchParams}
          searchParams={searchParams}
          handleSubmit={handleSubmit}
        />
      </div>
      <div className="col-start-1 col-end-6 ">
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
      </div>
    </div>
  );
};

export default Home;
