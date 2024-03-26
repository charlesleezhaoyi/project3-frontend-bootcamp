const Button = ({ label, onClick }) => {
  return (
    <>
      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        type="submit"
        onClick={onClick}
      >
        {label}
      </button>
    </>
  );
};

export default Button;
