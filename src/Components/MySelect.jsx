const MySelect = ({
  label,
  value,
  options = [],
  onChange,
  noDropdown = false,
}) => {
  // Prevent blank value before options arrive
  if (!noDropdown && options.length === 0) {
    return (
      <div className="form-group mb-3">
        {label && <label className="form-label">{label}</label>}
        <div className="form-control bg-dark text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="form-group mb-3">
      {label && <label className="form-label">{label}</label>}

      {noDropdown ? (
        <div className="form-control bg-dark text-white">
          {value ?? "—"}
        </div>
      ) : (
        <select
          className="form-select custom-select"
          value={value ?? ""}
          onChange={onChange}
        >
          {!value && <option value="">Select</option>}

          {options.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default MySelect;
