import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Select from "react-select";
import { useAuth0 } from "@auth0/auth0-react";

export default function ForumCreatePost() {
  const [, setErrorMessage] = useOutletContext();
  const navigate = useNavigate();
  const { user, getAccessTokenSilently } = useAuth0();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [titleInput, setTitleInput] = useState("");
  const [choosenCategories, setChoosenCategories] = useState([]);
  const [contentInput, setContentInput] = useState("");

  useEffect(() => {
    const getCategoriesOption = async () => {
      try {
        const token = await getAccessTokenSilently();
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/categories/all`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCategoryOptions(
          data.map((category) => {
            return { value: category.name, label: category.name };
          })
        );
      } catch (error) {
        setErrorMessage(error.message);
      }
    };
    getCategoriesOption();
  }, [setErrorMessage, getAccessTokenSilently]);

  const handleSubmit = async () => {
    try {
      if (!titleInput.length) {
        throw new Error("Title cannot be empty");
      }
      if (!contentInput.length) {
        throw new Error("Content cannot be empty");
      }
      if (!choosenCategories.length) {
        throw new Error("Must have at least one category");
      }
      const categories = choosenCategories.map((option) => option.value);
      const postData = {
        authorEmail: user.email,
        title: titleInput,
        content: contentInput,
        categories,
      };
      const token = await getAccessTokenSilently();
      const newPostRes = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/posts`,
        postData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/forum/posts/${newPostRes.data.id}?isNewPost=true`);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="w-5/6 sm:w-1/2">
      <div className="flex items-center py-5 space-x-5">
        <button className="btn btn-ghost" onClick={() => navigate(-1)}>
          <ArrowBackOutlinedIcon fontSize="large" />
        </button>
        <b className="text-2xl">Create Post:</b>
      </div>
      <div className="border-2 border-neutral rounded-xl flex flex-col space-y-5 items-center pb-5 m-5">
        <div className="space-x-3 flex items-center w-5/6 pt-3">
          <label className="text-xl">Title:</label>
          <input
            className="input input-bordered border-2 w-full"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
        </div>
        <div className="flex flex-col w-5/6  space-y-3">
          <label className="text-xl self-start">Genres:</label>
          {!!categoryOptions.length ? (
            <Select
              options={categoryOptions}
              isMulti
              styles={{
                control: (baseStyle) => ({
                  ...baseStyle,
                  background: "oklch(var(--b1))",
                  border: "2px solid oklch(var(--b3))",
                }),
              }}
              onChange={(e) => setChoosenCategories(e)}
            />
          ) : (
            <div className="skeleton w-80 h-10"></div>
          )}
        </div>
        <div className="flex flex-col w-5/6  space-y-3">
          <label className="text-xl self-start">Content:</label>
          <textarea
            className="textarea textarea-bordered h-60"
            value={contentInput}
            onChange={(e) => setContentInput(e.target.value)}
          />
        </div>
        <button
          className="btn w-5/6 btn-outline"
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
