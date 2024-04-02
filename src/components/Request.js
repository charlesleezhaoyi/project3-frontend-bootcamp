import React, { useState, useEffect } from "react";
import { TextArea } from "./Common/Input";
import Button from "./Common/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Request = () => {
  const [content, setContent] = useState("");
  const { user, isLoading } = useAuth0();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoading && user.email) {
      const requestObj = {
        content: content,
        bookId: 1,
        email: user.email,
      };

      const res = await axios.post(`${BACKEND_URL}/requests`, requestObj);
      console.log(res.data);

      return navigate("/home");
    }
  };

  return (
    <>
      <form className="border rounded-lg p-5 space-y-3" onSubmit={handleSubmit}>
        <div className="font-semibold text-2xl">Submit book request</div>
        <TextArea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="I want this book because..."
        />
        <Button label="Request this book" />
      </form>
    </>
  );
};

export default Request;
