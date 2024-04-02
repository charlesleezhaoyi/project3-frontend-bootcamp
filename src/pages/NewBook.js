import React, { useState } from "react";
import { BACKEND_URL } from "../constants.js";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleChange = (selectedItem) => {
    setSelectedCategories(selectedItem);
  };

  const handleFileChange = (e) => {
    const imageFile = new Blob([e.target.files[0]]);
    const convertedImageUrl = URL.createObjectURL(imageFile);
    setPhotoArr((photoArr) => [
      ...photoArr,
      { display: convertedImageUrl, file: imageFile, index: photoArr.length },
    ]);
  };

  const photos = photoArr.map((image) => {
    return (
      <div
        className="w-20 h-32 sm:w-32 sm:h-44 bg-center bg-cover flex justify-end border rounded-lg"
        key={image.index}
        style={{ backgroundImage: `url(${image.display})` }}
      >
        <button
          className="btn btn-xs glass m-1"
          onClick={() => {
            setPhotoArr(photoArr.filter((item) => item.index !== image.index));
          }}
        >
          X
        </button>
      </div>
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const obj = {
      title: title,
      author: author,
      description: description,
      releasedYear: releasedYear,
      condition: condition,
      review: review,
      email: user.email,
    };
    obj.categories = selectedCategories.map((item) => item.label);
    obj.photos = photoArr.map(({ display, ...photo }) => photo);

    const res = await axios.post(`${BACKEND_URL}/books`, obj);
    const bookId = res.data.id;
    return navigate(`/books/${bookId}`);
  };
  return (
    <div className="grid grid-cols-4 m-10 space-y-3">
      <div className="col-start-1 sm:col-start-2 text-left pl-6">
        <button onClick={() => navigate(-1)}>
          <ArrowBackRoundedIcon fontSize="large" />
        </button>
      </div>
      <div className="col-start-1 col-end-5 p-5 sm:col-start-2 sm:col-span-2">
        <form className="space-y-12 p-5  border border-neutral rounded-2xl">
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
        </form>
      </div>
    </div>
  );
};

export default NewBook;
