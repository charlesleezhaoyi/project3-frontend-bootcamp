import { useState } from "react";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Settings from ".././ProfileSettings/Settings";
import { useAuth0 } from "@auth0/auth0-react";

export default function NavBar({ setErrorMessage }) {
  const [slideOverOpen, setSlideOverOpen] = useState(false);
  const { user } = useAuth0();

  return (
    <div className="navbar border-b-2 border-b-2 py-6">
      <div className="navbar-start space-x-3">
        <Link to="/home" className="btn btn-ghost">
          <HomeOutlinedIcon fontSize="large" />
        </Link>
      </div>
      <div className="navbar-end">
        <Link className="btn btn-ghost" onClick={() => setSlideOverOpen(true)}>
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
  );
}
