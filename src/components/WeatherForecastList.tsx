import { Collapse, Skeleton, Card, Row, Col } from "antd"
import { useFetchForecastQuery, QueryParams, HourlyForcast, Units } from "../services/weatherService"
import { UnitTypeMapping } from "../helpers/constants";
import WeatherForecastCard from "./WeatherForecastCard";

interface WeatherForecastProps {
  queryParams: QueryParams
}

interface CollapseLabelProps {
  record: HourlyForcast;
  units: Units;
}

const groupByDay = (list: HourlyForcast[]) => {
  const groups: { [key: string]: HourlyForcast[] } = {};
  list.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
  });
  return groups;
}

const CollapseLabel = ({record, units}: CollapseLabelProps) => {
  return (
    <Row>
      <Col span={7}>{new Date(record.dt * 1000).toLocaleDateString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</Col>
      <Col span={7}>{record.weather[0].main}</Col>
      <Col span={7}>{record.main.temp} {UnitTypeMapping[units]}</Col>
      <Col span={3}>{record.pop} %</Col>
    </Row>
  )
}

const WeatherForecast = (props: WeatherForecastProps) => {
  const { queryParams } = props
  const { data, isFetching, isLoading } = useFetchForecastQuery(queryParams, { refetchOnMountOrArgChange: true });
  if(isFetching || isLoading) return <div><Skeleton active /></div>

  const groupedRecords = groupByDay(data?.list || [])

  const collapseItems = Object.keys(groupedRecords).reduce((acc: any, date: string) => {
    const header = {
      key: date,
      label: <h3>{date}</h3>,
      showArrow: false,
      collapsible: 'icon',
    }
    acc = [...acc, header]
    const children = groupedRecords[date].map((record: HourlyForcast) => {
      return {
        key: record.dt,
        label: <CollapseLabel record={record} units={queryParams.units} />,
        children: <WeatherForecastCard record={record} units={queryParams.units} />,
      }
    })
    acc = [...acc, ...children]
    return acc
  }, [])

  const defaultKey = collapseItems?.[1]?.key

  return (
    <>
     <Card>
      <Row align={"middle"}>
        <Col><h1>Weather Forecast</h1></Col> 
        <Col style={{ textAlign: 'center', marginLeft: '5px' }} ><h4>- {data?.city?.name}, {data?.city?.country}</h4></Col>
      </Row>
      <div> As of {new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</div>
     </Card>
      <Collapse style={{ backgroundColor: 'white' }} items={collapseItems} bordered={false} expandIconPosition="end"  defaultActiveKey={[defaultKey]} />
    </>
  )
}

export default WeatherForecast
