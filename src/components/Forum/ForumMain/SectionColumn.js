import axios from "axios";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function SectionColumn({ category, sort, setErrorMessage }) {
  const [postData, setPostData] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    const getPostData = async () => {
      try {
        const sortBy =
          sort === "name" || sort === "popularSection" ? "popular" : sort;

        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/posts/category/${category.name}?sortBy=${sortBy}&limit=1`
        );
        setPostData(data[0]);
        setIsLoadingData(false);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getPostData();
  }, [setErrorMessage, sort, category.name]);

  const postDataDisplay = useMemo(() => {
    if (!postData) {
      return <div>No Post Yet.</div>;
    }
    const authorName = postData.author.firstName
      ? `${postData.author.firstName} ${postData.author.lastName}`
      : postData.author.email.split("@")[0];
    const postDataDisplay = (
      <Link
        to={`/forum/posts/${postData.id}`}
        className="sm:h-12 items-center flex justify-between btn px-2 flex-nowrap"
      >
        <b className="truncate w-1/2 sm:w-2/3 text-left">{postData.title}</b>
        <div className="sm:w-1/3 w-1/2 2xl flex items-center justify-between">
          {authorName}
          <div className="flex items-center">
            {postData.likeCount}
            <FavoriteBorderOutlinedIcon />
          </div>
        </div>
      </Link>
    );
    return postDataDisplay;
  }, [postData]);

  return (
    <div className="flex flex-col border-2 border-neutral rounded-md">
      <Link
        to={`/forum/categories/${category.name}`}
        className="flex self-start border-b-2 border-neutral p-5 w-full hover:bg-base-300"
      >
        <b className="text-lg">{category.name}</b>
      </Link>
      {isLoadingData ? (
        <span className="loading loading-dots"></span>
      ) : (
        postDataDisplay
      )}
    </div>
  );
}
