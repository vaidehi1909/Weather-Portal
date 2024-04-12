import { Card, Col, Row } from "antd";
import { HourlyForcast, Units } from "../services/weatherService";
import { UnitTypeMapping } from "../helpers/constants";
import clouds from "../assets/cloud.png";
import temp from "../assets/thermometer.png";
import visibility from "../assets/visible.png";
import wind from "../assets/wind.png";
import humidity from "../assets/humidity.png";

interface WeatherForecastCardProps {
  record: HourlyForcast;
  units: Units;
}

const style = {
  fontWeight: "bold",
};

const colSpan = {
  xl: { span: 8 },
  lg: { span: 8 },
  md: { span: 12 },
  sm: { span: 12 },
  xs: { span: 12 },
};
const colStyle = {
  display: "flex",
  alignItems: "center",
  borderBottom: "1px solid lightgray",
  marginBottom: "10px",
};
const WeatherForecastCard = (props: WeatherForecastCardProps) => {
  const { record, units } = props;
  return (
    <Card title={record.weather[0].description} bordered>
      <Row justify={"space-between"}>
        <Col {...colSpan} style={colStyle}>
          <img
            src={temp}
            alt="temp"
            height={30}
            width={30}
            style={{ marginRight: 10 }}
          />
          <div style={{ marginRight: 10 }}>Feels Like</div>
          <div style={style}>
            {record.main.feels_like} {UnitTypeMapping[units]}
          </div>
        </Col>
        <Col {...colSpan} style={colStyle}>
          <img
            src={wind}
            alt="wind"
            height={30}
            width={30}
            style={{ marginRight: 10 }}
          />
          <div style={{ marginRight: 10 }}>Wind</div>
          <div style={style}>{record.wind.speed} mps</div>
        </Col>
        <Col {...colSpan} style={colStyle}>
          <img
            src={humidity}
            alt="humidity"
            height={20}
            width={20}
            style={{ marginRight: 10 }}
          />
          <div style={{ marginRight: 10 }}>Humidity</div>
          <div style={style}>{record.main.humidity} %</div>
        </Col>
        <Col {...colSpan} style={colStyle}>
          <img
            src={temp}
            alt="temp"
            height={30}
            width={30}
            style={{ marginRight: 10 }}
          />
          <div style={{ marginRight: 10 }}>Max Temp</div>
          <div style={style}>
            {record.main.temp_max} {UnitTypeMapping[units]}
          </div>
        </Col>
        <Col {...colSpan} style={colStyle}>
          <img
            src={clouds}
            alt="clouds"
            height={30}
            width={30}
            style={{ marginRight: 10 }}
          />
          <div style={{ marginRight: 10 }}>Cloudiness</div>
          <div style={style}>{record.clouds.all} %</div>
        </Col>
        <Col {...colSpan} style={colStyle}>
          <img
            src={visibility}
            alt="visibility"
            height={20}
            width={20}
            style={{ marginRight: 10 }}
          />
          <div style={{ marginRight: 10 }}>Visibility</div>
          <div style={style}>{record.visibility / 1000} km</div>
        </Col>
      </Row>
    </Card>
  );
};

export default WeatherForecastCard;
