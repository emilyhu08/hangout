import { Input } from 'antd';
import React from 'react';
import { useStateValue } from '../../store/StateProvider';

const SearchBar = () => {
  const { Search } = Input;

  const [{ search }, dispatch] = useStateValue();

  const onSearch = (value) => {
    dispatch({
      type: 'ADD_TO_SEARCH',
      item: value,
    });
  };

  return <Search placeholder='input search text' onSearch={onSearch} style={{ width: 400 }} />;
};

export default SearchBar;
