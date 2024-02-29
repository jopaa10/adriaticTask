export function calculateTotalPrice(startDate, endDate, priceList) {
  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();
  let totalPrice = 0;

  if (startTimestamp === endTimestamp) {
    const pricePerNight = priceList.find((interval) => {
      const intervalStartTimestamp = new Date(interval.intervalStart).getTime();
      const intervalEndTimestamp = new Date(interval.intervalEnd).getTime();
      return (
        startTimestamp >= intervalStartTimestamp &&
        startTimestamp < intervalEndTimestamp
      );
    });

    if (pricePerNight) {
      totalPrice = pricePerNight.pricePerNight;
    }
  } else {
    // Loop through each price interval in the priceList
    for (const interval of priceList) {
      const intervalStartTimestamp = new Date(interval.intervalStart).getTime();
      const intervalEndTimestamp = new Date(interval.intervalEnd).getTime();

      // Check if the interval overlaps with the selected date range
      if (
        intervalStartTimestamp <= endTimestamp &&
        intervalEndTimestamp >= startTimestamp
      ) {
        const start = Math.max(intervalStartTimestamp, startTimestamp);
        const end = Math.min(intervalEndTimestamp, endTimestamp);
        const daysInRange = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        totalPrice += daysInRange * interval.pricePerNight;
      }
    }
  }

  return totalPrice;
}
