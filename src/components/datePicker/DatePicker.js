import { useEffect, useState } from "react";
import "./datePicker.scss";

function DatePicker({
  availableDates,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) {
  const [minStartDate, setMinStartDate] = useState("");
  const [maxStartDate, setMaxStartDate] = useState("");
  const [minEndDate, setMinEndDate] = useState("");
  const [maxEndDate, setMaxEndDate] = useState("");
  const [inputFocused, setInputFocused] = useState(false);

  const handleStartDateChange = (event) => {
    const selectedStartDate = event.target.value
      ? new Date(event.target.value)
      : null;
    const selectedEndDate = new Date(endDate);

    if (selectedEndDate && selectedStartDate > selectedEndDate) {
      setEndDate(event.target.value);
    }

    setStartDate(event.target.value);
    setMinEndDate(
      selectedStartDate ? selectedStartDate.toISOString().split("T")[0] : ""
    );
  };

  const handleEndDateChange = (event) => {
    const selectedEndDate = event.target.value
      ? new Date(event.target.value)
      : null;
    const selectedStartDate = new Date(startDate);

    if (selectedStartDate && selectedStartDate > selectedEndDate) {
      setStartDate(event.target.value);
    }

    setEndDate(event.target.value);
    setMaxStartDate(
      selectedEndDate ? selectedEndDate.toISOString().split("T")[0] : ""
    );
  };

  useEffect(() => {
    if (availableDates && availableDates.length > 0) {
      const earliestStartDate = new Date(
        Math.min(...availableDates.map((date) => new Date(date.intervalStart)))
      );
      const latestEndDate = new Date(
        Math.max(...availableDates.map((date) => new Date(date.intervalEnd)))
      );
      const year2024 = new Date("2024-01-01");
      setMinStartDate(
        earliestStartDate > year2024
          ? earliestStartDate.toISOString().split("T")[0]
          : "2024-01-01"
      );
      setMaxStartDate(
        latestEndDate < year2024
          ? latestEndDate.toISOString().split("T")[0]
          : "2024-12-31"
      );
      setMinEndDate(
        earliestStartDate > year2024
          ? earliestStartDate.toISOString().split("T")[0]
          : "2024-01-01"
      );
      setMaxEndDate(
        latestEndDate < year2024
          ? latestEndDate.toISOString().split("T")[0]
          : "2024-12-31"
      );
    }
  }, [availableDates]);

  return (
    <div className="date-picker-container">
      <label htmlFor="startDate">Start Date:</label>
      <input
        type="date"
        id="startDate"
        value={startDate}
        min={minStartDate}
        max={maxStartDate}
        onChange={handleStartDateChange}
        onKeyDown={(e) => {
          if (!inputFocused) {
            e.preventDefault();
          }
        }}
      />

      <label htmlFor="endDate">End Date:</label>
      <input
        type="date"
        id="endDate"
        value={endDate}
        min={minEndDate}
        max={maxEndDate}
        onChange={handleEndDateChange}
        onKeyDown={(e) => {
          e.preventDefault();
        }}
      />
    </div>
  );
}

export default DatePicker;
