import React from "react";

import NavBar from "../components/Common/NavBar";
import BookList from "../components/Dashboard/BookList";
import CategoryList from "../components/Dashboard/CategoryList";

const Home = () => {
  return (
    <div>
      <NavBar />
      <CategoryList />
      <BookList />
    </div>
  );
};

export default Home;
