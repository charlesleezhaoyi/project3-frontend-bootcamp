import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import ForumPostListItem from "./ForumPostListItem";
import Select from "react-select";
import Loading from "../../Common/Loading";
import { useAuth0 } from "@auth0/auth0-react";
const sortOption = [
  { label: "Popular", value: "popular" },
  { label: "Newest Post", value: "newestPost" },
  { label: "Newest Comment", value: "newestComment" },
];

export default function ForumSubSection() {
  const [postList, setPostList] = useState(null);
  const [sort, setSort] = useState("popular");
  const [, setErrorMessage] = useOutletContext();
  const { category } = useParams();
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getPostList = async () => {
      try {
        const token = await getAccessTokenSilently();
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/posts/category/${category}?sortBy=${sort}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPostList(data);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getPostList();
  }, [setErrorMessage, sort, category, getAccessTokenSilently]);

  let postListItems = postList ? (
    postList.map((post) => <ForumPostListItem post={post} key={post.id} />)
  ) : (
    <Loading />
  );

  if (!!postList && postList.length === 0) {
    postListItems = <div>No post yet.</div>;
  }

  return (
    <div className="w-5/6">
      <div className="flex items-center py-5">
        <button className="btn btn-ghost" onClick={() => navigate("/forum")}>
          <ArrowBackOutlinedIcon fontSize="large" />
        </button>
        <b className="text-2xl">{category}:</b>
      </div>
      <div className="flex items-center space-x-5">
        <span className="text-xl">Sorted By:</span>
        <Select
          className="w-56"
          defaultValue={{ label: "Popular", value: "popular" }}
          options={sortOption}
          onChange={(e) => setSort(e.value)}
          styles={{
            control: (baseStyle) => ({
              ...baseStyle,
              background: "oklch(var(--b1))",
              border: "2px solid oklch(var(--b3))",
            }),
          }}
        />
      </div>

      <div className="max-w-md sm:max-w-full flex flex-col border-2 border-neutral rounded-md my-5">
        <div className="flex border-b-2 border-neutral justify-between">
          <b className="pl-2">Post Title</b>
          <div className="sm:w-1/3 w-1/2 pr-2 flex justify-between">
            <b>Author</b>
            <b>Likes</b>
          </div>
        </div>
        {postListItems}
      </div>
    </div>
  );
}
