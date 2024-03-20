import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";

export default function ForumNavBar() {
  return (
    <div className="navbar border-b-2 border-b-2 py-6">
      <div className="navbar-start space-x-3">
        <Link to="/home" className="btn btn-ghost">
          <HomeOutlinedIcon fontSize="large" />
        </Link>
        <Link to="/forum/create" className="btn btn-outline rounded-full">
          Create Post
        </Link>
      </div>
      <div className="navbar-end">
        <Link className="btn btn-ghost">
          {/* Need to add link to the user Page*/}
          <AccountCircleOutlinedIcon fontSize="large" />
        </Link>
      </div>
    </div>
  );
}