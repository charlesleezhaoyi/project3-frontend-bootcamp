import { Link } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

export default function ForumPostListItem({ post }) {
  const authorName = post.author.firstName
    ? `${post.author.firstName} ${post.author.lastName}`
    : post.author.email.split("@")[0];
  return (
    <Link
      to={`/forum/posts/${post.id}`}
      className="p-2 hover:bg-base-200 space-y-2 border-b-2 border-grey last:border-0"
    >
      <div className="items-center flex justify-between flex-nowrap text-lg">
        <b className="truncate w-1/2 sm:w-2/3 text-left">{post.title}</b>
        <div className="sm:w-1/3 w-1/2 flex items-center justify-between">
          {authorName}
          <div className="flex items-center">
            {post.likeCount}
            <FavoriteBorderOutlinedIcon />
          </div>
        </div>
      </div>
      <p className="truncate text-sm text-left px-5">{post.content}</p>
    </Link>
  );
}
