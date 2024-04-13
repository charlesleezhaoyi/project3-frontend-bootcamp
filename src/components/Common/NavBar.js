import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Settings from ".././ProfileSettings/Settings";
import { useAuth0 } from "@auth0/auth0-react";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";

export default function NavBar({ setErrorMessage }) {
  const [slideOverOpen, setSlideOverOpen] = useState(false);
  const { user } = useAuth0();
  const location = useLocation();

  const navbarItems = () => {
    return (
      <>
        <div
          className={`navbar py-6 bg-base-10  ${
            slideOverOpen ? "sticky top-0" : "z-50"
          }`}
        >
          <div>
            <Link to="/home" className="btn btn-ghost navbar-item">
              <HomeOutlinedIcon fontSize="large" />
            </Link>
          </div>
          <div>
            {!location.pathname.includes("forum") && (
              <Link to="/forum" className="btn btn-ghost navbar-item">
                Forum
              </Link>
            )}
          </div>
          <div>
            {location.pathname.includes("home") && (
              <Link to="create-newbook" className="btn btn-ghost navbar-item">
                Create book
              </Link>
            )}
          </div>
          <div>
            {location.pathname.includes("forum") && (
              <Link
                to="/forum/create/post"
                className="btn btn-outline navbar-item"
              >
                Create Post
              </Link>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navbarItems()}
            </ul>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navbarItems()}</ul>
          </div>
        </div>
        <div className="navbar-end">
          <Link
            className="btn btn-ghost"
            onClick={() => setSlideOverOpen(true)}
          >
            <AccountCircleOutlinedIcon fontSize="large" />
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
    </>
  );
  // return (
  //   <div
  //     className={`navbar py-6 bg-base-10 ${
  //       slideOverOpen ? "sticky top-0" : "z-50"
  //     }`}
  //   >
  //     <div className="navbar-start">
  //       <Link to="/home" className="btn btn-ghost">
  //         <HomeOutlinedIcon fontSize="large" />
  //       </Link>
  //       {!location.pathname.includes("forum") && (
  //         <Link to="/forum" className="btn btn-ghost">
  //           <ForumRoundedIcon />
  //         </Link>
  //       )}

  //       {location.pathname.includes("home") && (
  //         <Link to="create-newbook" className="btn btn-outline rounded-full">
  //           Create book
  //         </Link>
  //       )}

  //       {location.pathname.includes("forum") && (
  //         <Link
  //           to="/forum/create/post"
  //           className="btn btn-outline rounded-full"
  //         >
  //           Create Post
  //         </Link>
  //       )}
  //     </div>
  //     <div className="navbar-end">
  //       <Link className="btn btn-ghost" onClick={() => setSlideOverOpen(true)}>
  //         <AccountCircleOutlinedIcon fontSize="large" />
  //       </Link>
  //       {user && (
  //         <Settings
  //           open={slideOverOpen}
  //           setOpen={setSlideOverOpen}
  //           setErrorMessage={setErrorMessage}
  //         />
  //       )}
  //     </div>
  //   </div>
  // );
}
