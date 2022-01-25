import React, { useEffect, useState } from 'react';
import { useStateValue } from 'store/StateProvider';
import tw from 'tailwind-styled-components';
import Activity from './Activity';
import AddNew from './AddNew';
import { auth } from 'firebase-config';

const Activities = ({ activities }) => {
  const [{ search, userInfo }, dispatch] = useStateValue();
  const [filterActivities, setFilterActivities] = useState([]);

  useEffect(() => {
    if (search.length) {
      let searched = activities.filter((activity) => {
        console.log(activity.data().activity, search);
        return activity.data().activity.includes(search);
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
      {userInfo ? <AddNew /> : null}
    </>
  );
};

export default Activities;

const Wrapper = tw.div`
grid grid-cols-5 gap-1
`;
