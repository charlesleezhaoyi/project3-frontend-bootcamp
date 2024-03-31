import { useState } from "react";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Settings from ".././ProfileSettings/Settings";

export default function NavBar() {
  const [slideOverOpen, setSlideOverOpen] = useState(false);

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
        <Settings open={slideOverOpen} setOpen={setSlideOverOpen} />
      </div>
    </div>
  );
}
