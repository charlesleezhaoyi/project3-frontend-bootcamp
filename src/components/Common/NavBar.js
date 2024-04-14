import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Settings from ".././ProfileSettings/Settings";
import { useAuth0 } from "@auth0/auth0-react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LoginButton from "../LoginButton";
export default function NavBar({ setErrorMessage }) {
  const [slideOverOpen, setSlideOverOpen] = useState(false);
  const { user } = useAuth0();
  const location = useLocation();

  const navbarItems = () => {
    return (
      <>
        <Link to="/home" className="btn btn-ghost navbar-item">
          Home
        </Link>
        {(!location.pathname.includes("forum") ||
          location.pathname.includes("forum/posts") ||
          location.pathname.includes("forum/create/post")) && (
          <Link to="/forum" className="btn btn-ghost navbar-item">
            Forum
          </Link>
        )}
        {(location.pathname.includes("home") ||
          location.pathname.includes("/")) && (
          <Link to="create-newbook" className="btn btn-ghost navbar-item">
            Create book
          </Link>
        )}
        {location.pathname.includes("forum") &&
          !location.pathname.includes("forum/create/post") && (
            <Link to="/forum/create/post" className="btn btn-ghost navbar-item">
              Create Post
            </Link>
          )}
      </>
    );
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <MenuOutlinedIcon />
          </div>
          <ul
            tabIndex={0}
            className="shadow-md menu menu-sm dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navbarItems()}
          </ul>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-6">{navbarItems()}</ul>
        </div>
      </div>
      <div className="navbar-end mr-6">
        <Link onClick={() => setSlideOverOpen(true)}>
          {user ? (
            <AccountCircleOutlinedIcon fontSize="large" />
          ) : (
            <LoginButton />
          )}
        </Link>
        {user && (
          <Settings
            open={slideOverOpen}
            setOpen={setSlideOverOpen}
            setErrorMessage={setErrorMessage}
          />
        )}
      </div>
    </div>
  );
}
