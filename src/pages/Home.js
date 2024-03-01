import { useEffect, useState } from "react";
import { getAccomodation } from "../api/getAccomodation";
import Card from "../components/Card";
import { filterAccommodationsByPrice } from "../utils/filterData";
import DatePicker from "../components/datePicker/DatePicker";
import { Capacity } from "../components/capacity/Capacity";
import { ApplyFilters } from "../utils/applyFilters";
import { calculateTotalPrice } from "../utils/calculateTotalPrice";
import "./home.scss";
import { Amenities } from "../components/amenities/Amenities";
import { FilterButtons } from "../components/filterButtons/FilterButtons";

function Home() {
  let [accommodation, setAccommodation] = useState([]);
  let [capacity, setCapacity] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isDatePicked, setIsDatePicked] = useState(false);
  const [selectedCapacity, setSelectedCapacity] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  async function fetchData() {
    const data = await getAccomodation();

    if (!data) return;

    setAccommodation(data);
    setLoading(false);

    const uniqueCapacities = data.reduce((acc, item) => {
      if (!acc.includes(item.capacity)) {
        acc.push(item.capacity);
      }
      return acc;
    }, []);

    const allAmenities = [
      ...new Set(data.flatMap((item) => Object.keys(item.amenities))),
    ];

    const allAvailableDates = data.flatMap((item) => item.availableDates);

    setAvailableDates(allAvailableDates);
    setAmenities(allAmenities);
    setCapacity(uniqueCapacities);
  }

  const handleOnChange = (e) => {
    const { checked, value } = e.target;
    setSelectedAmenities((prev) => {
      if (checked) return [...prev, value];
      return prev.filter((amenity) => amenity !== value);
    });
  };

  const handleApplyFilters = async () => {
    let filterData = [];

    if (startDate && endDate) {
      filterData = await ApplyFilters(
        startDate,
        endDate,
        selectedCapacity,
        selectedAmenities
      );

      const newStartDate = new Date(startDate);
      const newEndDate = new Date(endDate);

      const filteredAccommodationWithTotalPrice = filterData.reduce(
        (uniqueAccommodations, accommodation) => {
          const existingAccommodation = uniqueAccommodations.find(
            (item) => item.id === accommodation.id
          );

          if (!existingAccommodation) {
            const totalPrice = calculateTotalPrice(
              newStartDate,
              newEndDate,
              accommodation.pricelistInEuros
            );
            uniqueAccommodations.push({ ...accommodation, totalPrice });
          }

          return uniqueAccommodations;
        },
        []
      );

      const filteredAccommodations = await filterAccommodationsByPrice(
        filteredAccommodationWithTotalPrice
      );

      setAccommodation(filteredAccommodations);
      setIsDatePicked(true);
    } else if (capacity || selectedAmenities.length > 0) {
      filterData = await ApplyFilters(
        startDate,
        endDate,
        selectedCapacity,
        selectedAmenities
      );

      filterData = [...new Set(filterData)];

      setAccommodation(filterData);
    } else {
      alert("Choose filter date to get prices");
      return;
    }
  };

  const handleSelectCapacity = (selectedCapacity) => {
    setSelectedCapacity(selectedCapacity);
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  return (
    <section className="home-container">
      <h2 className="home-container__filter-title">Filter data</h2>
      <div className="home-container__filter-container">
        <DatePicker
          availableDates={availableDates}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
        <Capacity
          capacity={capacity}
          selectedCapacity={selectedCapacity}
          handleCapacitySelection={handleSelectCapacity}
        />

        <Amenities amenities={amenities} handleOnChange={handleOnChange} />
      </div>
      <FilterButtons
        handleApplyFilters={handleApplyFilters}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        setIsDatePicked={setIsDatePicked}
        setSelectedCapacity={setSelectedCapacity}
        setSelectedAmenities={setSelectedAmenities}
        fetchData={fetchData}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card-container">
          {accommodation.length === 0 ? (
            <p>
              there are no available accommodations according to the selected
              filters
            </p>
          ) : (
            accommodation.map((item, index) => (
              <div className="card" key={index}>
                <Card
                  props={item}
                  isDatePicked={isDatePicked}
                  selectedCapacity={selectedCapacity}
                  startDate={startDate}
                  endDate={endDate}
                  totalPrice={item.totalPrice}
                />
              </div>
            ))
          )}
        </div>
      )}
    </section>
  );
}

export default Home;
