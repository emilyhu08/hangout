import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Detail from '../../components/activities/Detail';
import { getAll, getOne } from '../../firebase-config';

const index = ({ activity }) => {
  return (
    <div>
      <Detail activity={activity} />
    </div>
  );
};

export async function getStaticPaths() {
  const allActivities = await getAll;
  const paths = allActivities.map((activity) => {
    return {
      params: {
        id: activity.id,
      },
    };
  });

  return {
    paths,
    fallback: 'blocking', // false or 'blocking'
  };
}

export async function getStaticProps(context) {
  //fetch data here
  const activityId = context.params.id;
  const activity = await getOne('activity', activityId);

  return {
    props: {
      activity: activity,
    },
    revalidate: 1,
  };
}
export default index;
