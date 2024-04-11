import { useState } from 'react';
import CityTable from "../../components/CityTable"
import { QueryParams, useFetchCitiesQuery } from "../../services/cityService";
import SearchBar from '../../components/SearchBar';

const defaultQueryParams: QueryParams = { 
  page: 0, 
  limit: 8, 
  select: 'geoname_id, name, label_en, population, timezone, coordinates', 
  order_by: 'name asc' 
};

const Home = () => {

  const [queryParams, setQueryParams] = useState<QueryParams>(defaultQueryParams)
  const { data, isFetching, isLoading } = useFetchCitiesQuery(queryParams, { refetchOnMountOrArgChange: true });

  const onPageChanged = (page: number) => {
    if(!isFetching && !isLoading)
      setQueryParams({ ...queryParams, page });
  }

  const onSearch = (value?: string) => {
    const where = value ? `suggest(name, "${value}")` : undefined
    setQueryParams({ ...queryParams, page: 0, where });
  }

  const onSortChanged = (value?: string) => {
    setQueryParams({ ...queryParams, order_by: value });
  }

  return (
    <>
      <SearchBar
        onSearch={onSearch}
      />
      <CityTable 
        page={queryParams.page} 
        onPageChanged={onPageChanged} 
        data={data} 
        loading={isFetching || isLoading}
        onSortChanged={onSortChanged}
      />
    </>
  )

}

export default Home
