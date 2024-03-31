import React, { useState } from "react";
import { TextArea } from "./Common/Input";
import Button from "./Common/Button";

const Request = () => {
  const [content, setContent] = useState("");

  return (
    <>
      <form className="border rounded-lg p-5 space-y-3">
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
