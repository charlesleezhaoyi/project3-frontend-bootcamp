import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../constants.js";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const [loadBooks, setLoadBooks] = useState([]);
  const navigate = useNavigate();

  const getBooks = async () => {
    const res = await axios.get(`${BACKEND_URL}/books/listed_books`);

    console.log(loadBooks);
    return res.data;
  };

  useEffect(() => {
    getBooks().then((res) => {
      setLoadBooks(res);
    });
  }, []);

  console.log(loadBooks);
  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Books</h2>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {loadBooks.map((book, index) => (
              <button onClick={() => navigate(`/listed_books/${index + 1}`)}>
                <div to={index + 1} key={index} className="group">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={book.photo}
                      alt={book.imageAlt}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{book.title}</h3>
                  <h3 className="mt-4 text-sm text-gray-700">{book.author}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {book.condition}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookList;

// const books = [
//   {
//     id: 1,
//     name: "Earthen Bottle",
//     href: "#",
//     price: "$48",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
//     imageAlt:
//       "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
//   },
//   {
//     id: 2,
//     name: "Nomad Tumbler",
//     href: "#",
//     price: "$35",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
//     imageAlt:
//       "Olive drab green insulated bottle with flared screw lid and flat top.",
//   },
//   {
//     id: 3,
//     name: "Focus Paper Refill",
//     href: "#",
//     price: "$89",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
//     imageAlt:
//       "Person using a pen to cross a task off a productivity paper card.",
//   },
//   {
//     id: 4,
//     name: "Machined Mechanical Pencil",
//     href: "#",
//     price: "$35",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
//     imageAlt:
//       "Hand holding black machined steel mechanical pencil with brass tip and top.",
//   },
//   // More products...
// ];

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
