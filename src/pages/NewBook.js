import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import {
  TextArea,
  TextInput,
  FileInput,
  SelectInput,
} from "../components/Common/Input";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";
import useLoadCategories from "../hooks.js/useLoadCategories.js";

let nextId = 0;
const NewBook = () => {
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
    };

    const res = await axios.post(`${BACKEND_URL}/books`, obj);
    const bookId = res.data.id;
    const bookTitle = res.data.title;
    navigate(`/listed_books/${bookId}/${bookTitle}`);
    return res;
  };

  return (
    <>
      <div className="grid grid-cols-4 m-10 space-y-3">
        <div className="col-start-2">
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className="col-start-2 col-span-2 p-5 border rounded-2xl">
          <form className=" space-y-12">
            <div>
              <TextInput
                label="Book title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Grumpy Monkey"
              />
              <TextInput
                label="Author"
                type="text"
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Suzanne Lang"
              />
              <TextArea
                label="Description"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
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
                placeholder="2018"
              />
              <TextInput
                label="Condition"
                type="text"
                onChange={(e) => setCondition(e.target.value)}
                placeholder="New"
              />
              <TextArea
                label="Review"
                onChange={(e) => setReview(e.target.value)}
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
