import React from "react";

import { useNavigate } from "react-router-dom";

const BookList = ({ bookList }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="mx-auto max-w-2xl px-4 py-16 space-y-9 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold">Books</h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {bookList.map((book, index) => (
            <button onClick={() => navigate(`/books/${index + 1}`)}>
              <div to={index + 1} key={index} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                  <img
                    src={book.photo}
                    alt={book.imageAlt}
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
          ))}
        </div>
      </div>
    </>
  );
};

export default BookList;

// export default function BookList() {
//   return (
//     <div className="bg-white">
//       <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
//         <h2 className="sr-only">Books</h2>
//         <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
//           {books.map((book) => (
//             <a key={book.id} href={book.href} className="group">
//               <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
//                 <img
//                   src={book.imageSrc}
//                   alt={book.imageAlt}
//                   className="h-full w-full object-cover object-center group-hover:opacity-75"
//                 />
//               </div>
//               <h3 className="mt-4 text-sm text-gray-700">{book.name}</h3>
//               <p className="mt-1 text-lg font-medium text-gray-900">
//                 {book.price}
//               </p>
//             </a>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
