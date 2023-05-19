// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB293rHl-EInd3sjawDeeXV3xDERPzH4YM",
  authDomain: "microtrade-teszt.firebaseapp.com",
  projectId: "microtrade-teszt",
  storageBucket: "microtrade-teszt.appspot.com",
  messagingSenderId: "138342983007",
  appId: "1:138342983007:web:ab8ea637487a82444902ea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { storage, firestore };