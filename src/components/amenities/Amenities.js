import "./amenities.scss";

export function Amenities({ amenities, handleOnChange }) {
  return (
    <div className="home-container__amenities-container">
      <h2 className="home-container__filter-title">More</h2>
      {amenities.map((item) => (
        <div key={item}>
          <input
            type="checkbox"
            id={item}
            name={item}
            value={item}
            onChange={(e) => handleOnChange(e)}
          />

          <span>&nbsp;</span>
          <label htmlFor={item.name} className="checkmark">
            {item.name}
          </label>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}
