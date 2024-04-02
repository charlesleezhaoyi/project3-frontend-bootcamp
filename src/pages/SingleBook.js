import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";
import Request from "../components/Request";
import { useAuth0 } from "@auth0/auth0-react";
import RequestList from "../components/RequestList.js";
import Loading from "../components/Common/Loading.js";

const SingleBook = () => {
  const [bookData, setbookData] = useState(null);
  const [categoriesName, setCategoriesName] = useState(null);
  const [email, setEmail] = useState(null);
  const { user } = useAuth0();
  const isBookByDonor = user && user.email === email;
  const { bookId } = useParams();

  useEffect(() => {
    const getBook = async () => {
      const bookRes = await axios.get(`${BACKEND_URL}/books/${bookId}`);
      const { donation, categories, ...incomingBookData } = bookRes.data;
      setbookData(incomingBookData);
      setEmail(donation.donor.email);
      const categoryArr = categories.map((category) => category.name);
      setCategoriesName(categoryArr);
    };
    getBook();
  }, [bookId]);

  return bookData ? (
    <div className="grid grid-cols-4 m-10 ">
      <div className="col-start-1 col-end-5 p-5 space-y-6 sm:col-start-2 sm:col-span-2 ">
        <form className="space-y-6 text-xl">
          <div>Category: {categoriesName}</div>
          <div>Title: {bookData.title}</div>
          <div>Author: {bookData.author}</div>
          <div>Description: {bookData.description}</div>
          <div>Relased Year: {bookData.releasedYear}</div>
          <div>Condition: {bookData.condition}</div>
          <div>Review: {bookData.review}</div>
          <div>Gallery: {}</div>
        </form>
        <div>
          {isBookByDonor ? <RequestList book={bookData} /> : <Request />}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default SingleBook;
