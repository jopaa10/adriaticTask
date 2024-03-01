import { Link, useNavigate } from "react-router-dom";
import { PriceMinMaxDisplay } from "../components/MinMaxPrice";
import "./card.scss";

function Card({
  props,
  isDatePicked,
  selectedCapacity,
  startDate,
  endDate,
  totalPrice,
}) {
  const { title, image, capacity, beachDistanceInMeters, id } = props;
  const navigate = useNavigate();

  const handleMakeReservation = (title, e) => {
    e.preventDefault();
    const reservationInfo = {
      title,
      selectedCapacity,
      startDate,
      endDate,
      totalPrice,
    };

    navigate("/reservation", { state: reservationInfo });
  };

  return (
    <Link to={`/${id}`}>
      <div className="image">
        <img src={image} alt={title} />
      </div>
      <div className="details">
        <h2>{title}</h2>
        <p>Capacity: {capacity}</p>
        {beachDistanceInMeters && <p>Beach: {beachDistanceInMeters} m</p>}
        {isDatePicked ? (
          <div>
            <p>Total price is: {totalPrice}</p>
            <button onClick={(e) => handleMakeReservation(title, e)}>
              Reserve
            </button>
          </div>
        ) : (
          <PriceMinMaxDisplay priceIntervals={props.pricelistInEuros} />
        )}
      </div>
    </Link>
  );
}

export default Card;
