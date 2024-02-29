import { getAccomodation } from "../api/getAccomodation";

export async function filterData(id) {
  const data = await getAccomodation();

  return data.filter((item) => item.id.toString() === id);
}

export async function filterDataByPeople(number) {
  const data = await getAccomodation();

  return data.filter((item) => item.capacity === number);
}

export async function filterDataByAmenities(amenities) {
  const data = await getAccomodation();

  const filteredAccommodations = data.filter((accommodation) => {
    return accommodation.amenities[amenities];
  });

  return filteredAccommodations;
}

export async function filterDataByAvailableDates(startDate, endDate) {
  const data = await getAccomodation();

  const filteredAccommodations = data.filter((accommodation) => {
    return accommodation.availableDates.some((date) => {
      const intervalStartTimestamp = new Date(date.intervalStart).getTime();
      const intervalEndTimestamp = new Date(date.intervalEnd).getTime();
      const startTimestamp = new Date(startDate).getTime();
      const endTimestamp = new Date(endDate).getTime();
      return (
        startTimestamp >= intervalStartTimestamp &&
        endTimestamp <= intervalEndTimestamp
      );
    });
  });

  return filteredAccommodations;
}

export async function filterAccommodationsByPrice(data) {
  const filteredAccommodations = data.filter((accommodation) => {
    return accommodation.totalPrice !== 0; // Exclude accommodations with a total price of zero
  });

  return filteredAccommodations;
}
