import { useNavigate } from "react-router-dom";
import noImage from "../../img/noBookImage.png";
import { convertBufferToPhoto } from "../Common/convertPhoto";
import { useEffect, useState } from "react";

export default function BookListItem({ book }) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const createPhotoURL = () => {
      setPhotoUrl(
        book.photos.length
          ? convertBufferToPhoto(book.photos[0].file.data)
          : noImage
      );
    };

    createPhotoURL();
  }, [book.photos]);

  useEffect(() => {
    return function clearupURL() {
      if (photoUrl) {
        URL.revokeObjectURL(photoUrl);
      }
    };
  }, [photoUrl]);

  return (
    <button key={book.id} onClick={() => navigate(`/books/${book.id}`)}>
      <div className="group">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={photoUrl}
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
}
