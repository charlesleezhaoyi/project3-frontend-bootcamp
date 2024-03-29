import React from "react";
// import LogoutButton from "./LogoutButton";
// import LoginButton from "./LoginButton";
import NavBar from "../components/Common/NavBar";
import BookList from "../components/Dashboard/BookList";
import CategoryList from "../components/Dashboard/CategoryList";
import SearchBar from "./Dashboard/SearchBar";

const Home = () => {
  return (
    <div>
      <NavBar />
      <SearchBar onSearch={(term) => console.log(term)} />

      <CategoryList />
      <BookList />
      {/* <LoginButton />
      <LogoutButton /> */}
    </div>
  );
};

export default Home;
