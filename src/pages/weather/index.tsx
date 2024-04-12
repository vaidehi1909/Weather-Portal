import { QueryParams } from "../../services/weatherService";
import { useNavigate, useSearchParams } from "react-router-dom";
import WeatherForecast from "../../components/WeatherForecastList";
import { useEffect } from "react";

const Weather = () => {
  const [searchParams] = useSearchParams();
  const Navigate = useNavigate();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  useEffect(() => {
    if (!lat || !lon) {
      Navigate("/");
    }
  }, []);

  const queryParams: QueryParams = {
    lat: Number(lat),
    lon: Number(lon),
    units: "metric",
  };
  return (
    <>
      <WeatherForecast queryParams={queryParams} />
    </>
  );
};

export default Weather;
