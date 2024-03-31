import Select from "react-select";

export const TextInput = ({ label, type, onChange, placeholder, value }) => {
  return (
    <>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <input
          type={type}
          placeholder={placeholder}
          className="input input-bordered w-full max-w-xs italic"
          onChange={onChange}
          value={value}
        />
      </label>
    </>
  );
};

export const TextArea = ({ label, onChange, placeholder, value }) => {
  return (
    <>
      <label className="form-control">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <textarea
          className="input input-bordered h-24 italic"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
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

export const SelectInput = ({ value, onChange, selectedCategories }) => {
  const categoryOptions = value.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  return (
    <>
      <label className="form-control">
        <div className="label">
          <span className="label-text">
            What categories does this book fall under?
          </span>
        </div>
        <Select
          isMulti
          options={categoryOptions}
          onChange={onChange}
          value={selectedCategories}
        />
      </label>
    </>
  );
};
