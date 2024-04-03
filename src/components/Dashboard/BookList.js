import React from "react";
import { useNavigate } from "react-router-dom";
import noImage from "../../img/noBookImage.png";

const BookList = ({ bookList }) => {
  const navigate = useNavigate();

  const bookListDisplay = bookList.map((book) => {
    // const imageFile = book.photos.length && new Blob(book.photos[0].file);
    // const photoUrl = imageFile ? URL.createObjectURL(imageFile) : noImage;
    return (
      <button key={book.id} onClick={() => navigate(`/books/${book.id}`)}>
        <div className="group">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img
              src={"photoUrl"}
              alt={book.title}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <h3 className="mt-4 text-sm text-gray-700 text-xl font-medium">
            {book.title}
          </h3>
          <h3 className="mt-4 text-sm text-gray-700">{book.author}</h3>
          <p className="mt-1 text-gray-900">{book.condition}</p>
        </div>
      </button>
    );
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 space-y-9 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold">Books:</h2>
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {bookListDisplay}
      </div>
    </div>
  );
};

export default BookList;
