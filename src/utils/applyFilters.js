import {
  filterDataByAmenities,
  filterDataByAvailableDates,
  filterDataByPeople,
} from "./filterData";

export async function ApplyFilters(
  startDate,
  endDate,
  selectedCapacity,
  selectedAmenities
) {
  let filteredData = [];

  if (startDate && endDate) {
    const filteredByDates = await filterDataByAvailableDates(
      startDate,
      endDate
    );
    filteredData = filteredData.concat(filteredByDates);
  }

  if (selectedCapacity) {
    const filteredByCapacity = await filterDataByPeople(selectedCapacity);
    filteredData = filteredData.concat(filteredByCapacity);
  }

  if (selectedAmenities.length > 0) {
    const filteredByAmenities = await filterDataByAmenities(selectedAmenities);
    filteredData = filteredData.concat(filteredByAmenities);
  }

  return filteredData;
}
