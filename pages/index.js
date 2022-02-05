import { db } from 'firebase-config';
import { collection } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import Activities from '../components/activities/Activities';

export default function Home() {
  const [activities, loading, error] = useCollection(collection(db, 'activities'));

  return (
    <>
      <Activities activities={activities && activities.docs} />
    </>
  );
}

// export async function getServerSideProps() {
//   //fetch data here
//   return {
//     props: {
//       activities: await getAll,
//     },
//   };
// }
