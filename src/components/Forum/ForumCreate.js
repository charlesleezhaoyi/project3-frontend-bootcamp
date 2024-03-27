import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Select from "react-select";
import { useAuth0 } from "@auth0/auth0-react";
export default function ForumCreate({ type }) {
  const [, setErrorMessage] = useOutletContext();
  const navigate = useNavigate();
  const { user } = useAuth0();
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [titleInput, setTitleInput] = useState("");
  const [choosenCategories, setChoosenCategories] = useState([]);
  const [contentInput, setContentInput] = useState("");

  useEffect(() => {
    const getCategoriesOption = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/categories/all`
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
    if (type === "post") {
      getCategoriesOption();
    } else {
      setErrorMessage("Wrong Type for create form.");
    }
  }, [type, setErrorMessage]);

  const handleSubmit = async () => {
    try {
      if (!titleInput.length) {
        throw new Error("Title cannot be empty");
      }
      if (!contentInput.length) {
        throw new Error("Content cannot be empty");
      }
      const categories = choosenCategories.map((option) => option.value);
      const postData = {
        authorEmail: user.email,
        title: titleInput,
        content: contentInput,
        categories,
      };
      const newPostRes = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/posts`,
        postData
      );
      navigate(`/forum/posts/${newPostRes.data.id}`);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <div className="flex items-center py-5 space-x-5">
        <button className="btn btn-ghost" onClick={() => navigate(-1)}>
          <ArrowBackOutlinedIcon fontSize="large" />
        </button>
        <b className="text-2xl">Create {type}:</b>
      </div>
      <div className="artboard phone-2 border-2 border-neutral rounded-xl flex flex-col justify-around items-center mb-5">
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
        </div>
        <div className="flex flex-col w-5/6  space-y-3">
          <label className="text-xl self-start">Content:</label>
          <textarea
            className="textarea textarea-bordered h-96"
            value={contentInput}
            onChange={(e) => setContentInput(e.target.value)}
          />
        </div>
        <button
          className="btn w-5/6 btn-outline"
          onClick={() => handleSubmit()}
        >
          Sumbit
        </button>
      </div>
    </div>
  );
}
