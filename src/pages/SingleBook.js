import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";
import Request from "../components/Request";

const SingleBook = () => {
  const [loadBook, setLoadBook] = useState([]);
  const [categories, setCategories] = useState([]);
  // const [categoryNames, setCategoryNames] = useState([]);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const getBook = async () => {
      const res = await axios.get(`${BACKEND_URL}/books/${id}`);
      console.log(res);
      const bookCategories = res.data.categories;
      const books = res.data;
      console.log(books);
      setCategories(bookCategories);
      setLoadBook(books);
    };
    getBook();
  }, []);

  // useEffect(() => {
  //   if (categories) {
  //     const categoryArr = [];
  //     for (const category of categories) {
  //       const bookCategory = category.name;
  //       categoryArr.push(bookCategory);
  //       setCategoryNames(categoryArr);
  //     }
  //   }
  // }, [categories]);

  // const category = categoryNames.length && categoryNames.join(", ");

  return (
    <>
      <div className="grid grid-cols-4 m-10 ">
        <div className="col-start-1 col-end-5 p-5 space-y-6 sm:col-start-2 sm:col-span-2 ">
          <form className="space-y-6 text-xl">
            {/* <div>Category: {category}</div> */}
            <div>Title: {loadBook.title}</div>
            <div>Author: {loadBook.author}</div>
            <div>Description: {loadBook.description}</div>
            <div>Relased Year: {loadBook.releasedYear}</div>
            <div>Condition: {loadBook.condition}</div>
            <div>Review: {loadBook.review}</div>
            <div>Gallery: {}</div>
          </form>
          <div>
            <Request />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBook;
