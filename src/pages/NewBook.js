import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../constants.js";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Button from "../components/Common/Button";
import {
  TextArea,
  TextInput,
  FileInput,
  SelectInput,
} from "../components/Common/Input";

import axios from "axios";
import useLoadCategories from "../hooks.js/useLoadCategories.js";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import Photo from "../components/Common/Photo.js";

const NewBook = () => {
  const { user } = useAuth0();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [releasedYear, setReleasedYear] = useState("");
  const [condition, setCondition] = useState("");
  const [review, setReview] = useState("");
  const [photoArr, setPhotoArr] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { categories } = useLoadCategories();
  const [, setErrorMessage] = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    return function clearupURL() {
      for (const { url } of photoArr) {
        URL.revokeObjectURL(url);
      }
    };
  });

  const handleChange = (selectedItem) => {
    setSelectedCategories(selectedItem);
  };

  const handleFileChange = (e) => {
    const url = URL.createObjectURL(e.target.files[0]);
    setPhotoArr((photoArr) => [
      ...photoArr,
      { file: e.target.files[0], url: url },
    ]);
  };

  const photos = photoArr.map((photo, i) => {
    return (
      <Photo url={photo.url} key={i}>
        <button
          className="btn btn-xs glass m-1"
          onClick={() => {
            setPhotoArr(photoArr.filter((target) => target !== photo));
          }}
        >
          X
        </button>
      </Photo>
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title: title,
        author: author,
        description: description,
        releasedYear: releasedYear,
        condition: condition,
        review: review,
      };
      for (const subData of Object.values(data)) {
        if (!subData.length) {
          throw new Error("Please fill out the form.");
        }
      }
      data.email = user.email;
      if (!selectedCategories.length) {
        throw new Error("Please choose at least one category");
      }
      data.categories = selectedCategories.map((item) => item.label);

      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      for (const { file } of photoArr) {
        formData.append(`image`, file);
      }
      const res = await axios.post(`${BACKEND_URL}/books`, formData);
      const bookId = res.data.id;

      return navigate(`/books/${bookId}`);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="grid grid-cols-4 m-10 space-y-3">
      <div className="col-start-1 sm:col-start-2 text-left pl-6">
        <button onClick={() => navigate(-1)}>
          <ArrowBackRoundedIcon fontSize="large" />
        </button>
      </div>
      <div className="col-start-1 col-end-5 p-5 sm:col-start-2 sm:col-span-2">
        <div className="space-y-12 p-5  border border-neutral rounded-2xl">
          <div>
            <TextInput
              label="Book title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Grumpy Monkey"
            />
            <TextInput
              label="Author"
              type="text"
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
              placeholder="Suzanne Lang"
            />
            <TextArea
              label="Description"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Could it be that he just needs a day to feel grumpy?"
            />
            <SelectInput value={categories} onChange={handleChange} />
            <TextInput
              label="Released Year"
              type="number"
              onChange={(e) => setReleasedYear(e.target.value)}
              value={releasedYear}
              placeholder="2018"
            />
            <TextInput
              label="Condition"
              type="text"
              onChange={(e) => setCondition(e.target.value)}
              value={condition}
              placeholder="New"
            />
            <TextArea
              label="Review"
              onChange={(e) => setReview(e.target.value)}
              value={review}
              placeholder="Best book so far!"
            />
          </div>
          <div>
            <div className="flex justify-around items-center gap-4 flex-wrap">
              {photos}
            </div>
          </div>
          <FileInput onChange={handleFileChange} />
          <div>
            <Button label="Submit" onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBook;
