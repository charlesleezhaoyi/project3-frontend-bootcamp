import React from "react";

const Acceptance = ({ book }) => {
  return (
    <>
      <form className="border rounded-lg p-5 space-y-3">
        <div className="font-semibold text-2xl">
          All beneficiary's requests for {book.title} by {book.author}
        </div>
      </form>
    </>
  );
};

export default Acceptance;
