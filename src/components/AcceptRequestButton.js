import axios from "axios";

export default function AcceptRequestButton({ requesterId, bookId }) {
  console.log(requesterId, bookId);
  const handleSubmit = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/requests/accept`, {
        beneId: requesterId,
        bookId: bookId,
      });
    } catch (error) {
      console.log(error);
      //need to change later
    }
  };
  return <button onClick={handleSubmit}>Accept</button>;
}
