import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import { BACKEND_URL } from "../constants.js";
import axios from "axios";
import { TextInput } from "../components/Input.js";

const SingleBook = () => {
  const [loadBook, setLoadBook] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const getBook = async () => {
    const res = await axios.get(`${BACKEND_URL}/books/${id}`);

    return res.data;
  };

  useEffect(() => {
    getBook().then((res) => {
      setLoadBook(res);
    });
  }, []);

  const handleClick = () => {};

  return (
    <>
      <div className="grid grid-cols-4 m-10 space-y-3">
        <div className="col-start-2 col-span-2 p-5 ">
          <form className=" space-y-12">
            <div>
              <div className="text-xl">Title: {loadBook.title}</div>
              <div className="text-xl">Author: {loadBook.author}</div>
              <div className="text-xl">Description: {loadBook.description}</div>
              <div className="text-xl">
                Relased Year: {loadBook.releasedYear}
              </div>
              <div className="text-xl">Condition: {loadBook.condition}</div>
              <div className="text-xl">Review: {loadBook.review}</div>
            </div>
            <div className="p-10">
              {/* Open the modal using document.getElementById('ID').showModal() method */}
              {/* Open the modal using document.getElementById('ID').showModal() method */}
              <button
                className="btn p-10
                "
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                {" "}
                Request this book
              </button>
              <dialog id="request_modal" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">!</h3>
                  <p className="py-4">
                    Press ESC key or click the button below to close
                  </p>
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn">Close</button>
                    </form>
                  </div>
                </div>
              </dialog>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SingleBook;
