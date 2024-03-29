import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";

const SingleBook = () => {
  const [loadBook, setLoadBook] = useState([]);

  const { id } = useParams();

  const getBook = async () => {
    const res = await axios.get(`${BACKEND_URL}/books/${id}`);
    return res.data;
  };

  useEffect(() => {
    getBook().then((res) => {
      console.log(res);
      console.log(res.categories[0].name);
      setLoadBook(res);
    });
  }, []);

  return (
    <>
      <div className="grid grid-cols-4 m-10 ">
        <div className="col-start-1 col-end-5 p-5 space-y-3 ">
          <form className=" space-y-12">
            <div>
              <div className="text-xl">
                Categories:
                {/* {categoryNames} */}
              </div>

              <div className="text-xl">Title: {loadBook.title}</div>
              <div className="text-xl">Author: {loadBook.author}</div>
              <div className="text-xl">Description: {loadBook.description}</div>
              <div className="text-xl">
                Relased Year: {loadBook.releasedYear}
              </div>
              <div className="text-xl">Condition: {loadBook.condition}</div>
              <div className="text-xl">Review: {loadBook.review}</div>
            </div>
          </form>
          <div>
            <form></form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBook;
