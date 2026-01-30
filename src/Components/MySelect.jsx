const MySelect = ({ label, value, options = [], onChange, noDropdown }) => {
  
  // If options not loaded yet
  if (!options || options.length === 0) {
    return (
      <div className="form-group mb-3">
        {label && <label className="form-label">{label}</label>}
        <div className="form-control">Loading…</div>
      </div>
    );
  }

  // Always convert incoming VALUE → ID
  const resolvedId = (() => {
    if (value === null || value === undefined || value === "") return "";

    if (typeof value === "number") return value;

    const found = options.find((o) => o.name === value);
    return found ? found.id : "";
  })();

  const displayText = (() => {
    const found = options.find((o) => o.id === resolvedId);
    return found ? found.name : "Not set";
  })();

  return (
    <div className="form-group mb-3">
      {label && <label className="form-label">{label}</label>}

      {noDropdown ? (
        <div className="form-control">{displayText}</div>
      ) : (
        <select
          className="form-control"
          value={resolvedId}
          onChange={(e) =>
            onChange({
              target: { value: Number(e.target.value) },
            })
          }
        >
          {!value && <option value="">Select</option>}
          {options.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default MySelect;
