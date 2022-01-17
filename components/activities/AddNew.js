import React from 'react';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { db } from '../../firebase-config';

const AddNew = () => {
  const addActivity = async () => {
    const docRef = await addDoc(collection(db));
  };

  return (
    <div>
      <PlusCircleIcon className='fixed bottom-10 right-10 h-10 w-10 text-blue-400' />
    </div>
  );
};

export default AddNew;
