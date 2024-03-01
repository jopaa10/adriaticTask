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
    filteredData = filteredByDates;
  } else if (selectedCapacity) {
    filteredData = await filterDataByPeople(selectedCapacity);
  } else if (selectedAmenities.length > 0) {
    filteredData = await filterDataByAmenities(selectedAmenities);
  }

  if (filteredData.length > 0) {
    if (selectedCapacity || selectedAmenities.length > 0) {
      filteredData = filteredData.filter((accommodation) =>
        selectedAmenities.every((amenity) => accommodation.amenities[amenity])
      );
      if (selectedCapacity) {
        filteredData = filteredData.filter(
          (accommodation) => accommodation.capacity === selectedCapacity
        );
      }
    }

    if (startDate && endDate) {
      filteredData = filteredData.filter((accommodation) => {
        const availableDates = accommodation.availableDates || [];
        const matchesDates = availableDates.some((dateRange) => {
          const start = new Date(dateRange.intervalStart);
          const end = new Date(dateRange.intervalEnd);
          const targetStart = new Date(startDate);
          const targetEnd = new Date(endDate);
          return targetStart >= start && targetEnd <= end;
        });
        return matchesDates;
      });
    }
  }

  filteredData = Array.from(new Set(filteredData));

  return filteredData;
}
