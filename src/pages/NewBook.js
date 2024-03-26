import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { TextArea, TextInput, FileInput } from "../components/Input";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [releasedYear, setReleasedYear] = useState("");
  const [condition, setCondition] = useState("");
  const [review, setReview] = useState("");
  const [photoArr, setPhotoArr] = useState([]);

  // const [clickedPhotoId, setClickedPhotoId] = useState("");

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const imageName = e.target.files[0].name;

    setPhotoArr((photoArr) => [...photoArr, { photoUrl: imageName }]);
  };

  // use a function
  // useEffect(() => {
  //   if (clickedPhotoId !== null) {
  //     const newPhotoArr = [...photoArr];
  //     newPhotoArr.splice(clickedPhotoId, 1);
  //     setPhotoArr(newPhotoArr);
  //   }
  // }, [clickedPhotoId]);

  const photos = photoArr.length
    ? photoArr.map((image, index) => {
        return (
          <>
            <div
              className="border border-dashed overflow-hidden relative"
              key={index}
            >
              <img
                className="object-cover h-20 w-24"
                src={image.photoUrl}
                alt="book_cover"
              />
              <div className="absolute top-0 border ml-2 text-secondary-200 font-bold">
                {/* <button onClick={() => setClickedPhotoId(index)}>X</button> */}
              </div>
            </div>
          </>
        );
      })
    : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = {
      title: title,
      author: author,
      description: description,
      releasedYear: releasedYear,
      condition: condition,
      review: review,
      photoUrl: photoArr,
    };

    const res = await axios.post(`${BACKEND_URL}/books`, obj);
    navigate("/home-sample");
    return res;
  };

  return (
    <>
      <div className="grid grid-cols-4 m-10 space-y-3">
        <div className="col-start-2">
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
        <div className="col-start-2 col-span-2 p-5 border">
          <form className=" space-y-12">
            <div>
              <TextInput
                label="Book title"
                type="text"
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextInput
                label="Author"
                type="text"
                onChange={(e) => setAuthor(e.target.value)}
              />
              <TextArea
                label="Description"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextInput
                label="Released Year"
                type="number"
                onChange={(e) => setReleasedYear(e.target.value)}
              />
              <TextInput
                label="Condition"
                type="text"
                onChange={(e) => setCondition(e.target.value)}
              />
              <TextArea
                label="Review"
                onChange={(e) => setReview(e.target.value)}
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
