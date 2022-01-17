// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  addDoc,
  doc,
} from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

// init Firebase
initializeApp(firebaseConfig);

// init service
const db = getFirestore();

// collection ref
const colRef = collection(db, 'activities');

const getAll = getDocs(colRef).then((snapshot) => {
  let activities = [];
  snapshot.docs.forEach((doc) => {
    activities.push({ ...doc.data(), id: doc.id });
  });
  return activities;
});
const addActivity = async (activity) => {
  await addDoc(collection(db, 'activities'), activity);
};

const deleteActivity = async () => {
  await deleteDoc(doc(db, 'activities', 'DC'));
};

const provider = new GoogleAuthProvider();

const auth = getAuth();

export { provider, auth, getAll, addActivity, deleteActivity };
