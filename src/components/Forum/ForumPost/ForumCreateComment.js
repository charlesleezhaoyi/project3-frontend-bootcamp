import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState } from "react";

export default function ForumCreateComment({
  setErrorMessage,
  postId,
  setCommentList,
}) {
  const [isCreateComment, setIsCreateComment] = useState(null);
  const { user, getAccessTokenSilently } = useAuth0();
  const [input, setInput] = useState("");

  const handleSubmit = async () => {
    const token = await getAccessTokenSilently();
    console.log(token);
    try {
      if (!input.length) {
        throw new Error("Please type in your comment.");
      }
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/comments/${postId}`,
        {
          userEmail: user.email,
          content: input,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCommentList((prev) => [
        ...prev,
        { ...data.comment, commenter: data.user },
      ]);
      setIsCreateComment(false);
      setInput("");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  let animation = "initial-state";
  if (isCreateComment === true) {
    animation = "fade-in";
  } else if (isCreateComment === false) {
    animation = "fade-out initial-state";
  }
  return (
    <div className="fixed w-5/6 bottom-5 z-50">
      <div
        className={`w-full bg-base-300 p-5 rounded-lg border-neutral border-2 space-y-2 ${animation}`}
      >
        <div className="flex justify-between">
          <h3>Create Comment:</h3>
          <button
            onClick={() => setIsCreateComment(false)}
            className="btn btn-sm btn-rounded"
          >
            X
          </button>
        </div>
        <textarea
          className="textarea textarea-bordered w-full h-28 resize-none"
          value={input}
          placeholder="Nice Topic..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSubmit} className="btn btn-wide">
          Submit
        </button>
      </div>

      <button
        className="btn w-full border-neutral"
        onClick={() => setIsCreateComment(true)}
      >
        Comment
      </button>
    </div>
  );
}
