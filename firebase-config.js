// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const storage = getStorage(firebaseApp);

const colRef = collection(db, 'activities');

const provider = new GoogleAuthProvider();

const auth = getAuth();

const getAll = getDocs(colRef).then((snapshot) => {
  let activities = [];
  snapshot.docs.forEach((doc) => {
    activities.push({ ...doc.data(), id: doc.id });
  });
  return activities;
});

const getOne = async (col, id) => {
  const docRef = doc(db, col, id);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

const addOne = async (col, data) => {
  await addDoc(collection(db, col), data, { merge: true });
};

const setOne = async (col, data, id) => {
  await setDoc(collection(db, col, id), data);
};

const deleteOne = async (col, id) => {
  await deleteDoc(doc(db, col, id));
};

const updateOne = async (col, data, field) => {
  const docRef = doc(db, col, field);
  setDoc(docRef, data);

  await updateDoc(docRef, data);
};

export { db, provider, auth, getAll, storage, addOne, setOne, deleteOne, getOne, updateOne };
