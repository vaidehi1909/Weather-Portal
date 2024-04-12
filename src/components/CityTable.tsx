import { UIEvent, memo } from "react";
import { Table, TableProps, TableColumnsType } from "antd";
import { ApiResponse, CityRecord } from "../services/cityService";
import { NavLink } from "react-router-dom";

interface CityTableProps {
  page: number;
  onPageChanged: (page: number) => void;
  onSortChanged: (sort?: string) => void;
  data: ApiResponse | undefined;
  loading?: boolean;
}

type OnChange = NonNullable<TableProps<CityRecord>["onChange"]>;
// type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const columns: TableColumnsType<CityRecord> = [
  {
    title: "Location",
    dataIndex: "name",
    defaultSortOrder: "ascend",
    align: "center",
    sorter: true,
    render: (text, record) => (
      <NavLink
        to={`/weather?lat=${record.coordinates.lat}&lon=${record.coordinates.lon}`}>
        {text}
      </NavLink>
    ),
  },
  {
    title: "Country",
    dataIndex: "label_en",
    sorter: true,
    align: "center",
  },
  {
    title: "Timezone",
    dataIndex: "timezone",
    sorter: true,
    align: "center",
  },
  {
    title: "Population",
    dataIndex: "population",
    sorter: true,
    align: "center",
  },
];

const CityTable = (props: CityTableProps) => {
  const { page, onPageChanged, data, loading, onSortChanged } = props;

  const onScroll = (e: UIEvent<Element>) => {
    if (data && data?.total_count > data?.results.length) {
      const { scrollTop, clientHeight } = e.target as Element;
      if (scrollTop / clientHeight > page) {
        onPageChanged(page + 1);
      }
    }
  };

  const onTableChange: OnChange = (_, __, sorter, extra) => {
    if (extra?.action === "sort" && sorter) {
      const { field, order } = sorter as Sorts;
      if (field && order)
        onSortChanged(`${field} ${order === "ascend" ? "asc" : "desc"}`);
      else onSortChanged();
    }
  };

  return (
    <Table
      bordered
      virtual
      loading={loading}
      columns={columns}
      scroll={{
        // x: 2000,
        y: 400,
      }}
      rowKey="geoname_id"
      dataSource={data?.results || []}
      pagination={false}
      onScroll={onScroll}
      onChange={onTableChange}
    />
  );
};

export default memo(CityTable);
