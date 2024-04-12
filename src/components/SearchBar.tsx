import React from "react";
import { Input } from "antd";
import debounce from "lodash.debounce";

interface SearchBarProps {
  onSearch: (value?: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const OnDebounceSearch = debounce((value) => {
    props.onSearch(value);
  }, 300); // 300 is the delay in milliseconds

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    OnDebounceSearch(value ? value : undefined);
  };

  return (
    <Input
      placeholder="Search location"
      onChange={onChange}
      allowClear
      style={{ marginBottom: 10 }}
    />
  );
};

export default React.memo(SearchBar);
