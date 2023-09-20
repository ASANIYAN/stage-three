import { initializeApp } from "firebase/app";
import { 
    getAuth, 
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAwU6R7pJg0kVZTxmYFhpdSOYpjBiP4nok",
    authDomain: "stage-three-hng.firebaseapp.com",
    projectId: "stage-three-hng",
    storageBucket: "stage-three-hng.appspot.com",
    messagingSenderId: "963479326193",
    appId: "1:963479326193:web:8c11d2504fa5446eda4850"  
};

initializeApp(firebaseConfig);

export const auth = getAuth();

  