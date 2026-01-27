const MySelect = ({
  label,
  value,
  options = [],
  onChange,
  noDropdown = false,
}) => {
  if (!options || options.length === 0) {
    return (
      <div className="form-group mb-3">
        {label && <label className="form-label">{label}</label>}
        <div className="form-control ">Loading...</div>
      </div>
    );
  }

  // Convert string NAME → numeric ID
  const resolvedValue = (() => {
    if (value === null || value === undefined || value === "") return "";

    if (typeof value === "number") return value;

    // value is a NAME → find matching id
    const match = options.find((opt) => opt.name === value);
    return match ? match.id : "";
  })();

  return (
    <div className="form-group mb-3">
      {label && <label className="form-label">{label}</label>}

      {noDropdown ? (
        <div className="form-control">
          {value || ""}
        </div>
      ) : (
        <select
          value={resolvedValue}
          className="form-control"
          onChange={(e) =>
            onChange({
              target: { value: Number(e.target.value) },
            })
          }
        >
          {!resolvedValue && <option value="">Select</option>}
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default MySelect;
