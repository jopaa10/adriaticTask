export const PriceMinMaxDisplay = ({ priceIntervals }) => {
  // Finding min and max prices
  const minPrice = Math.min(
    ...priceIntervals.map((interval) => interval.pricePerNight)
  );
  const maxPrice = Math.max(
    ...priceIntervals.map((interval) => interval.pricePerNight)
  );

  return (
    <div className="price">
      <h2 className="price__title">Please choose dates to get exact prices</h2>
      <p>Minimum Price: {minPrice} €</p>
      <p>Maximum Price: {maxPrice} €</p>
    </div>
  );
};
