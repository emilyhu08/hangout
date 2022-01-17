import Head from 'next/head';
import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import tw from 'tailwind-styled-components';
import Activities from '../components/activities/Activities';
import { getDocs, addDoc } from 'firebase/firestore/lite';
import { getAll } from '../firebase-config';

// export async function getStaticProps() {
//   //fetch data here
//   let activities = {};
//   try {
//     getAll().then((data) => {
//       activities = data;
//     });
//   } catch (error) {
//     console.log('Error getting documents: ', error);
//   }

//   return {
//     props: {
//       activities: { activities },
//     },
//     revalidate: 10,
//   };
// }

export default function Home() {
  const [activities, setActivities] = useState();

  useEffect(() => {
    getAll.then((data) => {
      setActivities(data);
    });
  }, []);

  return (
    <>
      <Head>
        <title>hangout</title>
        <meta name='description' content='something' />
      </Head>
      <Activities activities={activities} />
    </>
  );
}

const Wrapper = tw.div``;
