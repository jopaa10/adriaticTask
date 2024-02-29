import { useEffect, useState } from "react";
import { getAccomodation } from "../api/getAccomodation";
import Card from "../components/Card";
import {
  filterAccommodationsByPrice,
  filterDataByAvailableDates,
} from "../utils/filterData";
import DatePicker from "../components/datePicker/DatePicker";
import { Capacity } from "../components/capacity/Capacity";
import { ApplyFilters } from "../utils/applyFilters";
import { calculateTotalPrice } from "../utils/calculateTotalPrice";
import "./home.scss";
import { Amenities } from "../components/amenities/Amenities";

function Home() {
  let [accomodation, setAccomodation] = useState([]);
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

    setAccomodation(data);
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

  const handleOnChange = (e) => {
    const { checked, value } = e.target;
    setSelectedAmenities((prev) => {
      if (checked) return [...prev, value];
      return prev.filter((amenity) => amenity !== value);
    });
  };

  const handleDateFilter = async (startDate, endDate) => {
    const data = await filterDataByAvailableDates(startDate, endDate);
    setIsDatePicked(true);
    setAccomodation(data);
  };

  const handleApplyFilters = async () => {
    let filterData = [];

    if (
      startDate &&
      endDate &&
      selectedCapacity &&
      selectedAmenities.length > 0
    ) {
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

      console.log(filteredAccommodationWithTotalPrice);

      setAccomodation(filteredAccommodations);
      setIsDatePicked(true);
    } else {
      // Display a message indicating that all options need to be selected
      alert("Please select all options before applying filters.");
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
          onDateFilter={handleDateFilter}
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
      <div className="filter-buttons">
        <button onClick={handleApplyFilters}>apply filters</button>
        <button onClick={handleResetFilters}>reset filters</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card-container">
          {accomodation.map((item, index) => (
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
          ))}
        </div>
      )}
    </section>
  );
}

export default Home;
