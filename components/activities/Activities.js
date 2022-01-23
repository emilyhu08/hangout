import React, { useEffect, useState } from 'react';
import { useStateValue } from 'store/StateProvider';
import tw from 'tailwind-styled-components';
import Activity from './Activity';
import AddNew from './AddNew';

const Activities = ({ activities }) => {
  const [{ search }, dispatch] = useStateValue();
  const [filterActivities, setFilterActivities] = useState([]);

  useEffect(() => {
    if (search.length) {
      let searched = activities.filter((activity) => {
        return activity.activity === search;
      });
      setFilterActivities(searched);
    } else {
      setFilterActivities(activities);
    }
  }, [search, activities]);

  return (
    <>
      <Wrapper>
        {filterActivities &&
          filterActivities.map((activity) => (
            <Activity activity={{ ...activity.data(), id: activity.id }} key={activity.id} />
          ))}
      </Wrapper>
      <AddNew />
    </>
  );
};

export default Activities;

const Wrapper = tw.div`
grid grid-cols-5 gap-1
`;
