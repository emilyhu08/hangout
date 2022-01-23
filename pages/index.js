import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import tw from 'tailwind-styled-components';
import Activities from '../components/activities/Activities';
import { db, auth, getAll } from 'firebase-config';
import { useStateValue } from 'store/StateProvider';
import { useCollectionData, useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore, collection } from 'firebase/firestore';

export default function Home() {
  const [{ userInfo }, dispatch] = useStateValue();
  const router = useRouter();

  // const [activities, loading, error, snapshot] = useCollectionData(collection(db, 'activities'));

  const [activities, loading, error] = useCollection(collection(db, 'activities'));

  // console.log(snapshot);
  // console.log('activities', activities);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: 'UPDATE_USER',
          item: {
            name: user.displayName,
            photoUrl: user.photoURL,
            email: user.email,
            uid: user.uid,
          },
        });
      } else {
        dispatch({
          action: 'UPDATE_USER',
          item: null,
        });
        router.push('./login');
      }
    });
  }, [router, dispatch]);

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

const Wrapper = tw.div``;
