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

let nextId = 0;
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

  let indexCount = 0;

  const handleChange = (selectedItem) => {
    setSelectedCategories(selectedItem);
  };

  const handleFileChange = (e) => {
    indexCount = indexCount + 1;
    const imageFile = e.target.files[0];
    console.log(imageFile);
    const convertedImageUrl = URL.createObjectURL(imageFile);
    setPhotoArr((photoArr) => [
      ...photoArr,
      { photoUrl: convertedImageUrl, index: (nextId += 1) },
    ]);
  };

  const photos = photoArr.map((image) => {
    return (
      <>
        <div
          className="border border-dashed overflow-hidden relative"
          key={image.index}
        >
          <img
            className="object-cover h-20 w-24"
            src={image.photoUrl}
            alt="book_cover"
          />
          <div className="absolute top-0 border ml-2 text-secondary-200 font-bold">
            <button
              onClick={() => {
                setPhotoArr(
                  photoArr.filter((item) => item.index !== image.index)
                );
              }}
            >
              X
            </button>
          </div>
        </div>
      </>
    );
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryArr = [];
    selectedCategories.forEach((item) => {
      const categoryName = item.label;
      return categoryArr.push(categoryName);
    });

    const obj = {
      title: title,
      author: author,
      description: description,
      releasedYear: releasedYear,
      condition: condition,
      review: review,
      photoUrl: photoArr,
      name: categoryArr,
      email: user.email,
    };

    const res = await axios.post(`${BACKEND_URL}/books`, obj);
    const bookId = res.data.id;

    return navigate(`/books/${bookId}`);
  };

  console.log(user);

  return (
    <>
      <div className="grid grid-cols-4 m-10 space-y-3 ">
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
              <SelectInput
                value={categories}
                onChange={handleChange}
                selectedCategories={selectedCategories}
              />
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
              <div className="flex gap-4">{photos}</div>
            </div>

            <FileInput onChange={handleFileChange} />

            <div>
              <Button label="Submit" onClick={handleSubmit} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewBook;
