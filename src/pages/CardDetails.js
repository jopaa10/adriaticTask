import { useParams } from "react-router";
import { filterData } from "../utils/filterData";
import { useEffect, useState } from "react";
import { PriceMinMaxDisplay } from "../components/MinMaxPrice";

function CardDetails() {
  const { id } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      const data = await filterData(id);
      setData(data[0]);
    }

    fetchData();
  }, [id]);

  return (
    <div className="card-details">
      {data && (
        <>
          <div className="card-details__title">
            <h2>{data.title}</h2>
            <img src={data.image} alt={data.title} />
          </div>
          <div className="card-details__details">
            <p>Capacity: {data.capacity}</p>
            {data.beachDistanceInMeters && (
              <p>Beach: {data.beachDistanceInMeters} m</p>
            )}
            {Object.entries(data.amenities).map(([key, value]) => (
              <p key={key}>
                {key}: {value ? "yes" : "no"}
              </p>
            ))}
          </div>
          <PriceMinMaxDisplay priceIntervals={data.pricelistInEuros} />
        </>
      )}
    </div>
  );
}

export default CardDetails;
