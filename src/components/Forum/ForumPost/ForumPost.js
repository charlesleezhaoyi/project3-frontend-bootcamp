import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import ForumComment from "./ForumComment";
import ForumNameAndDate from "./ForumNameAndDate";

export default function ForumPost() {
  const [postData, setPostData] = useState(null);
  const [isUserLiked, setIsUserLiked] = useState(false);
  const [, setErrorMessage] = useOutletContext();
  const navigate = useNavigate();
  const { postId } = useParams();
  const { user } = useAuth0();

  useEffect(() => {
    if (isNaN(Number(postId))) {
      navigate("/forum");
      setErrorMessage("Wrong type of postId");
    }
    const getPostData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/posts/${postId}`
        );
        setPostData(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    const getIsUserLiked = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/posts/like/${postId}/${user.email}`
        );
        setIsUserLiked(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getPostData();
    getIsUserLiked();
  }, [setErrorMessage, postId, user.email, navigate]);

  const handleToggleLike = async (e) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/posts/like`,
        {
          postId,
          userEmail: user.email,
          like: e.target.checked,
        }
      );
      setIsUserLiked(data);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const categoryList =
    postData &&
    postData.categories.map((categoryData) => (
      <Link
        to={`/forum/categories/${categoryData.name}`}
        className="btn btn-link"
        key={categoryData.id}
      >
        {categoryData.name}
      </Link>
    ));

  const commentsListDisplay =
    postData &&
    postData.comments.map((comment, i) => {
      return <ForumComment comment={comment} key={i} />;
    });

  const postDataDisplay = postData && (
    <div className="flex flex-col items-center">
      <div className="flex justify-between w-full p-2 border-b-2 border-neutral">
        <b className="text-2xl text-left grow">{postData.title}</b>
        <div className="flex items-center">
          {postData.likes.length}
          <label className="swap swap-flip">
            <input
              type="checkbox"
              className="hidden"
              checked={isUserLiked}
              onChange={handleToggleLike}
            />
            <div className="swap-on">
              <FavoriteOutlinedIcon />
            </div>
            <div className="swap-off">
              <FavoriteBorderOutlinedIcon />
            </div>
          </label>
        </div>
      </div>
      <ForumNameAndDate user={postData.author} date={postData.createdAt} />
      <div className="p-3 border-b-2 border-neutral last:border-0">
        <p className="text-left text-sm">{postData.content}</p>
        <div className="flex items-center">
          <span className="text-primary">Tag:</span>
          {categoryList}
        </div>
      </div>
      {commentsListDisplay}
    </div>
  );

  return (
    <div className="w-5/6 flex flex-col">
      <button
        className="btn btn-ghost self-start my-2"
        onClick={() => navigate(-1)}
      >
        {/*Need to add conditional path for user just created a post*/}
        <ArrowBackOutlinedIcon fontSize="large" />
      </button>
      <div className="w-full border-2 border-neutral rounded-md">
        {postData ? (
          postDataDisplay
        ) : (
          <span className="loading loading-dots loading-lg"></span>
        )}
      </div>
    </div>
  );
}
