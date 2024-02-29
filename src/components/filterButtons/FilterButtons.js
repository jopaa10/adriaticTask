export function FilterButtons({
  handleApplyFilters,
  setStartDate,
  setEndDate,
  setIsDatePicked,
  setSelectedCapacity,
  fetchData,
}) {
  const handleResetFilters = () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    setStartDate("");
    setEndDate("");
    setIsDatePicked(false);
    setSelectedCapacity(0);
    fetchData();
  };

  return (
    <div className="filter-buttons">
      <button onClick={handleApplyFilters}>apply filters</button>
      <button onClick={handleResetFilters}>reset filters</button>
    </div>
  );
}
