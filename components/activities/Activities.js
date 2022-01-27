import React, { useEffect, useState } from 'react';
import { useStateValue } from 'store/StateProvider';
import tw from 'tailwind-styled-components';
import Activity from './Activity';
import AddNew from './AddNew';
import { auth } from 'firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';

const Activities = ({ activities }) => {
  const [{ search }, dispatch] = useStateValue();
  const [user, loading] = useAuthState(auth);
  const [filterActivities, setFilterActivities] = useState([]);

  useEffect(() => {
    if (search.length) {
      let searched = activities.filter((activity) => {
        return activity.data().activity.toUpperCase().includes(search.toUpperCase());
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
      {user ? <AddNew /> : null}
    </>
  );
};

export default Activities;

const Wrapper = tw.div`
grid grid-cols-5 gap-1
`;
