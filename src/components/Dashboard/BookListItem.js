import { useNavigate } from "react-router-dom";
import noImage from "../../img/noBookImage.png";
import { convertBufferToPhoto } from "../Common/convertPhoto";
import { useEffect, useState } from "react";
import Photo from "../Common/Photo";

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
    <button
      className="flex flex-col items-center"
      key={book.id}
      onClick={() => navigate(`/books/${book.id}`)}
    >
      <Photo url={photoUrl} />
      <h3 className="mt-4 text-sm text-gray-700 text-xl font-medium">
        {book.title}
      </h3>
      <h3 className="mt-4 text-sm text-gray-700">{book.author}</h3>
      <p className="mt-1 text-gray-900">{book.condition}</p>
    </button>
  );
}
