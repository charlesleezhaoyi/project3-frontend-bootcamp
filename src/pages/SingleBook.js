import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";
import Request from "../components/Request";
import { useAuth0 } from "@auth0/auth0-react";
import RequestList from "../components/RequestList.js";
import Loading from "../components/Common/Loading.js";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { convertBufferToPhoto } from "../components/Common/convertPhoto.js";
import Photo from "../components/Common/Photo.js";
import RequestStatus from "../components/RequestStatus.js";

const SingleBook = () => {
  const [, setErrorMessage] = useOutletContext();
  const [bookData, setbookData] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [categoriesName, setCategoriesName] = useState(null);
  const [photoURLs, setPhotoURLs] = useState([]);
  const [requests, setRequests] = useState([]);
  const [isBookByDonor, setIsBookByDonor] = useState(false);
  const [isBeneRequested, setIsBeneRequested] = useState(false);
  const navigate = useNavigate();
  const { user, isLoading } = useAuth0();
  const { bookId } = useParams();

  useEffect(() => {
    const getBookAndRequest = async () => {
      try {
        const bookRes = await axios.get(`${BACKEND_URL}/books/${bookId}`);
        const { donation, categories, photos, ...incomingBookData } =
          bookRes.data;
        setbookData(incomingBookData);
        setIsBookByDonor(user.email === donation.donor.email);
        setCategoriesName(categories.map((category) => category.name));
        setPhotoURLs(
          photos.map((photo) => convertBufferToPhoto(photo.file.data))
        );
        const requestRes = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/requests/book/${bookId}`
        );
        console.log(requestRes.data);
        setRequests(requestRes.data);
        setIsBeneRequested(
          user.email !== donation.donor.email &&
            requestRes.data.find((request) => request.bene.email === user.email)
        );
        setIsLoadingData(false);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    if (!isLoading) {
      getBookAndRequest();
    }
  }, [bookId, isLoading, user, setErrorMessage]);

  useEffect(() => {
    return function clearupUrl() {
      for (const url of photoURLs) {
        URL.revokeObjectURL(url);
      }
    };
  }, [photoURLs]);

  const photosDisplay = photoURLs.map((url) => <Photo url={url} key={url} />);

  const nonDonorRequestDisplay = isBeneRequested ? (
    <RequestStatus
      request={requests.find((request) => request.bene.email === user.email)}
    />
  ) : (
    <Request />
  );

  return isLoadingData ? (
    <Loading />
  ) : (
    <div className="w-5/6">
      <div className="flex items-center py-5">
        <button className="btn btn-ghost" onClick={() => navigate(-1)}>
          <ArrowBackOutlinedIcon fontSize="large" />
        </button>
        <b className="text-2xl">Book Preview:</b>
      </div>
      <div className="border-neutral border-2 py-2">
        <table className="table">
          <tbody>
            <tr>
              <th>Category:</th>
              <td>{categoriesName}</td>
            </tr>
            <tr>
              <th>Title:</th>
              <td>{bookData.title}</td>
            </tr>
            <tr>
              <th>Author:</th>
              <td> {bookData.author}</td>
            </tr>
            <tr>
              <th>Relased Year: </th>
              <td>{bookData.releasedYear}</td>
            </tr>
            <tr>
              <th>Condition:</th>
              <td> {bookData.condition}</td>
            </tr>
          </tbody>
        </table>
        <div className="pl-4 py-4 text-left text-sm">
          <b>Description:</b>
        </div>
        <div className="mx-4 px-2 text-sm border-2 border-secondary">
          <p>{bookData.description}</p>
        </div>
        <div className="pl-4 py-4 text-left text-sm">
          <b>Review:</b>
        </div>
        <div className="mx-4 px-2 text-sm border-2 border-secondary">
          <p>{bookData.review}</p>
        </div>
        <div className="pl-4 py-4 text-left text-sm">
          <b>Gallery:</b>
        </div>
        <div className="flex justify-around items-center gap-4 flex-wrap">
          {photosDisplay}
        </div>
      </div>
      {isBookByDonor ? (
        <RequestList book={bookData} requests={requests} />
      ) : (
        nonDonorRequestDisplay
      )}
    </div>
  );
};
export default SingleBook;
