import React, { useState } from "react";
import { TextArea } from "./Common/Input";
import Button from "./Common/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { BACKEND_URL } from "../constants";
import { useParams } from "react-router-dom";
import axios from "axios";

const Request = ({ setErrorMessage }) => {
  const [content, setContent] = useState("");
  const { user } = useAuth0();
  const { bookId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!content.length) {
        throw new Error("Please type in your request content");
      }
      const requestObj = {
        content: content,
        bookId: bookId,
        email: user.email,
      };
      await axios.post(`${BACKEND_URL}/requests`, requestObj);
      window.location.reload();
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <form className="border rounded-lg p-5 space-y-3" onSubmit={handleSubmit}>
      <div className="font-semibold text-2xl">Submit book request</div>
      <TextArea
        onChange={(e) => setContent(e.target.value)}
        value={content}
        placeholder="I want this book because..."
      />
      <Button label="Request this book" />
    </form>
  );
};

export default Request;
