import React from "react";
import { useParams } from "react-router-dom";
// import { BACKEND_URL } from "../constants.js";
// import axios from "axios";
import Request from "../components/Request";
import useLoadBook from "../hooks.js/useLoadBook.js";

const SingleBook = () => {
  // const [loadBook, setLoadBook] = useState([]);
  // const [categories, setCategories] = useState([]);
  // const [categoryNames, setCategoryNames] = useState([]);
  const { book } = useLoadBook(id);

  const { id } = useParams();

  console.log(book);
  // useEffect(() => {
  //   const getBook = async () => {
  //     const res = await axios.get(`${BACKEND_URL}/books/${id}`);
  //     console.log(res);
  //     const bookCategories = res.data.categories;
  //     const books = res.data;
  //     console.log(bookCategories);
  //     setCategories(bookCategories);
  //     setLoadBook(books);
  //   };
  //   getBook();
  // }, []);

  // console.log(loadBook);
  // console.log(categories);

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
            <div>Title: {book.title}</div>
            <div>Author: {book.author}</div>
            <div>Description: {book.description}</div>
            <div>Relased Year: {book.releasedYear}</div>
            <div>Condition: {book.condition}</div>
            <div>Review: {book.review}</div>
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
