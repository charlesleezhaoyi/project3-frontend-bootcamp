import React from "react";
import BookListItem from "./BookListItem";
import Loading from "../Common/Loading";

const BookList = ({ bookList }) => {
  const bookListDisplay =
    bookList &&
    bookList.map((book) => <BookListItem book={book} key={book.id} />);

  return bookList ? (
    <div className="mx-auto max-w-2xl px-4 py-16 space-y-9 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold">Books:</h2>
      <div className="flex flex-wrap gap-5 justify-around">
        {bookListDisplay}
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default BookList;
