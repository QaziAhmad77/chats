// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAfl4PTTTD-Hje8Wnb4TelXa44vLX-felU',
  authDomain: 'chat-app-831e4.firebaseapp.com',
  projectId: 'chat-app-831e4',
  storageBucket: 'chat-app-831e4.appspot.com',
  messagingSenderId: '957619207164',
  appId: '1:957619207164:web:c11eae428b63a3fb80d079',
  measurementId: 'G-HQMHN6BTQ8',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db=getFirestore()
