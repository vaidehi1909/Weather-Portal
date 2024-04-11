import { Card, Col, Row } from "antd";
import { HourlyForcast, Units } from "../services/weatherService";
import { UnitTypeMapping } from "../helpers/constants";

interface WeatherForecastCardProps {
  record: HourlyForcast;
  units: Units;
}

const style = {
  fontWeight: "bold"
}

const colStyle = {
  borderBottom: "1px solid lightgray",
  marginBottom: "10px"
}
const WeatherForecastCard = (props: WeatherForecastCardProps) => {
  const { record, units } = props
  return (
    <Card title={record.weather[0].description} bordered>
      <Row justify={"space-between"}>
        <Col span={8} style={colStyle}>
          <div>Feels Like</div>
          <div style={style}>{record.main.feels_like} {UnitTypeMapping[units]}</div>
        </Col>
        <Col span={8} style={colStyle}>
          <div>Wind</div>
          <div style={style}>{record.wind.speed} mps</div>
        </Col>
        <Col span={8} style={colStyle}>
          <div>Humidity</div>
          <div style={style}>{record.main.humidity} %</div>
        </Col>
        <Col span={8} style={colStyle}>
          <div>Max Temp</div>
          <div style={style}>{record.main.temp_max} {UnitTypeMapping[units]}</div>
        </Col>
        <Col span={8} style={colStyle}>
          <div>Cloudiness</div>
          <div style={style}>{record.clouds.all} %</div>
        </Col>
        <Col span={8} style={colStyle}>
          <div>Visibility</div>
          <div style={style}>{record.visibility/1000} km</div>
        </Col>
      </Row>
    </Card>
  )
}

export default WeatherForecastCard
