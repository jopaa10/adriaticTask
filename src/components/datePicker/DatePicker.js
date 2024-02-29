import { useEffect, useState } from "react";
import "./datePicker.scss";

function DatePicker({
  availableDates,
  onDateFilter,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) {
  const [minStartDate, setMinStartDate] = useState("");
  const [maxStartDate, setMaxStartDate] = useState("");
  const [minEndDate, setMinEndDate] = useState("");
  const [maxEndDate, setMaxEndDate] = useState("");

  const handleStartDateChange = (event) => {
    const selectedStartDate = new Date(event.target.value);
    setStartDate(event.target.value);

    // Update min end date to prevent selecting end dates before the start date
    setMinEndDate(selectedStartDate.toISOString().split("T")[0]);

    // Calculate total days if both start and end dates are selected
    // if (endDate) {
    //   const selectedEndDate = new Date(endDate);
    //   const differenceInTime =
    //     selectedEndDate.getTime() - selectedStartDate.getTime();
    //   const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    //   setTotalDays(differenceInDays);
    // }
  };

  const handleEndDateChange = (event) => {
    const selectedEndDate = new Date(event.target.value);
    setEndDate(event.target.value);

    setMaxStartDate(selectedEndDate.toISOString().split("T")[0]);

    // if (startDate) {
    //   const selectedStartDate = new Date(startDate);
    //   const differenceInTime =
    //     selectedEndDate.getTime() - selectedStartDate.getTime();
    //   const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    //   setTotalDays(differenceInDays);
    // }
  };

  const handleFilter = () => {
    onDateFilter(startDate, endDate);
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

    // if (!startDate && !endDate) {
    //   setTotalDays(0);
    // }
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
      />

      <label htmlFor="endDate">End Date:</label>
      <input
        type="date"
        id="endDate"
        value={endDate}
        min={minEndDate}
        max={maxEndDate}
        onChange={handleEndDateChange}
      />
    </div>
  );
}

export default DatePicker;
