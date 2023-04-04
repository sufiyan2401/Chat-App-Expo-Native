import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAf9V6gd-_bXRvcJeirTgbMUqYp_9p6eCM",
  authDomain: "apple-5f8c4.firebaseapp.com",
  projectId: "apple-5f8c4",
  storageBucket: "apple-5f8c4.appspot.com",
  messagingSenderId: "830582330529",
  appId: "1:830582330529:web:2868fcf1a8b0c552340ce0",
  measurementId: "G-S2XHGVRK3D"
};
// initialize firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();