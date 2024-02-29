import "./capacity.scss";

export function Capacity({
  capacity,
  selectedCapacity,
  handleCapacitySelection,
}) {
  return (
    <div className="capacity-container">
      <h2 className="capacity-container__title">Capacity</h2>
      <div>
        {capacity.map((item) => (
          <label htmlFor="" key={item}>
            <input
              type="radio"
              value={item}
              name={item}
              checked={selectedCapacity === item}
              onChange={() => handleCapacitySelection(item)}
            />
            {item}
          </label>
        ))}
      </div>
    </div>
  );
}
