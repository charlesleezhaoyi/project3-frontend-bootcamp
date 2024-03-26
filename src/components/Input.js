export const TextInput = ({ label, type, onChange }) => {
  return (
    <>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <input
          type={type}
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
          onChange={onChange}
        />
      </label>
    </>
  );
};

export const TextArea = ({ label, onChange }) => {
  return (
    <>
      <label className="form-control">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <textarea
          className="input input-bordered h-24"
          placeholder="Description"
          onChange={onChange}
        ></textarea>
      </label>
    </>
  );
};

export const FileInput = ({ onChange }) => {
  return (
    <>
      <input
        type="file"
        className="file-input file-input-bordered w-full max-w-xs"
        onChange={onChange}
      />
    </>
  );
};
