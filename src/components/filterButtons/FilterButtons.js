export function FilterButtons({
  handleApplyFilters,
  setStartDate,
  setEndDate,
  setIsDatePicked,
  setSelectedCapacity,
  setSelectedAmenities,
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
    setSelectedAmenities([]);
    fetchData();
  };

  return (
    <div className="filter-buttons">
      <button onClick={handleResetFilters}>reset filters</button>
      <button onClick={handleApplyFilters} className="apply">
        apply filters
      </button>
    </div>
  );
}
