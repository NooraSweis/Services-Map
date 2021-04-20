import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyBoNwPNzNOeeGvm5Ty-MsXn9AHrONfYA_w",
  authDomain: "services-map-306613.firebaseapp.com",
  databaseURL: "https://services-map-306613-default-rtdb.firebaseio.com",
  projectId: "services-map-306613",
  storageBucket: "services-map-306613.appspot.com",
  messagingSenderId: "405840283942",
  appId: "1:405840283942:web:208bbff73a540fb997d9e7",
  measurementId: "G-TM9WCYR4NC"
};

const config = {
  apiKey: "AIzaSyBoNwPNzNOeeGvm5Ty-MsXn9AHrONfYA_w",
  authDomain: "services-map-306613.firebaseapp.com",
  databaseURL: "https://services-map-306613-default-rtdb.firebaseio.com",
  projectId: "services-map-306613",
  storageBucket: "services-map-306613.appspot.com",
  messagingSenderId: "405840283942",
  appId: "1:405840283942:web:208bbff73a540fb997d9e7",
  measurementId: "G-TM9WCYR4NC"
};

const fire = firebase.initializeApp(firebaseConfig);
export const secondaryApp = firebase.initializeApp(config, "Secondary");
export const thirdApp = firebase.initializeApp(config, "Third");

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export default fire;