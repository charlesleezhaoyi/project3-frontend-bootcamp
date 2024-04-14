import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import LoginButton from "../components/LoginButton";
export default function FirstPage() {
  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col ">
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-wider text-left ml-3 text-center">
            Book Donation App
          </h1>
          <p className="ml-3 py-3 text-sm">
            A platform to post and to request a book.
          </p>
          <div className="m-5">
            <MenuBookTwoToneIcon fontSize="large" />
          </div>
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
