import "../Styles/mainLayout.css"

const MySelect = ({
  label,
  value,
  options,
  optionValue = "id",
  optionLabel = "name",
  onChange,
}) => {
  return (
    <div className="form-group">
      {label && <label className="form-label">{label}</label>}

      <select
        className="form-select custom-select"
        value={value}
        onChange={onChange}
      >
        {options.map((item) => (
          <option key={item[optionValue]} value={item[optionValue]}>
            {item[optionLabel]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MySelect;
