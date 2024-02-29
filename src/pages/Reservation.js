import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./reservation.scss";

function Reservation() {
  const location = useLocation();
  const data = location.state;

  return (
    <section className="reservation-container">
      <h2>
        You have successfully make a reservation for {data.title} accomodation.
      </h2>
      <p>
        Capacity is {data.selectedCapacity}. You are staying here from
        {data.startDate} to {data.endDate}
      </p>
      <p>
        It will cost you: <strong>{data.totalPrice}€</strong>
      </p>
      <Link to={"/"}>Return to Home page</Link>
    </section>
  );
}
export default Reservation;
