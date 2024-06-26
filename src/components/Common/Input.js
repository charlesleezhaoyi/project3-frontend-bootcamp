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
          className="input input-bordered w-full max-w-xs border border-neutral"
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
          className="input input-bordered h-24 border border-neutral"
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
        className="file-input file-input-bordered w-full max-w-xs border border-neutral"
        onChange={onChange}
      />
    </>
  );
};

export const SelectInput = ({ value, onChange }) => {
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
          styles={{
            control: (baseStyle) => ({
              ...baseStyle,
              background: "oklch(var(--b1))",
              border: "2px solid oklch(var(--b3))",
            }),
          }}
        />
      </label>
    </>
  );
};
