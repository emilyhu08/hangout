import React from 'react';
import Activity from './Activity';
import mockData from '../../MOCK_DATA.json';
import tw from 'tailwind-styled-components';
import { v4 as uuidv4 } from 'uuid';

const Activities = () => {
  return (
    <Wrapper>
      {mockData.map((activity) => {
        return <Activity activity={activity} key={uuidv4()} />;
      })}
    </Wrapper>
  );
};

export default Activities;

const Wrapper = tw.div``;
