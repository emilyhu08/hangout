import { Select } from 'antd';
import React from 'react';

const Category = () => {
  const { Option } = Select;

  function onChange(value) {
    console.log(`selected ${value}`);
  }

  function onSearch(val) {
    console.log('search:', val);
  }

  return (
    <div>
      <Select
        showSearch
        placeholder='Select a person'
        optionFilterProp='children'
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }>
        <Option value='sport'>sport</Option>
        <Option value='food'>food</Option>
        <Option value='entertainment'>entertainment</Option>
        <Option value='entertainment'>entertainment</Option>
      </Select>
    </div>
  );
};

export default Category;
