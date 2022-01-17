import React, { useState } from 'react';
import Activity from './Activity';
import mockData from '../../MOCK_DATA.json';
import tw from 'tailwind-styled-components';
import AddNew from './AddNew';

const Activities = ({ activities }) => {
  return (
    <Wrapper>
      {activities &&
        activities.map((activity, i) => (
          <Activity activity={activity} key={i} />
        ))}
      <AddNew />
    </Wrapper>
  );
};

export default Activities;

const Wrapper = tw.div`
grid grid-cols-5 gap-1 bg-slate-50
`;
