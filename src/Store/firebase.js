import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAYX80caR8_aog8V5wCsRbm-m2qXgXkfKk",
  authDomain: "expenseapp-bb96a.firebaseapp.com",
  projectId: "expenseapp-bb96a",
  storageBucket: "expenseapp-bb96a.appspot.com",
  messagingSenderId: "582068038030",
  appId: "1:582068038030:web:64a93a6ba39490aee91cdf",
  databaseURL: "https://expenseapp-bb96a-default-rtdb.firebaseio.com",
};

export const app = initializeApp(firebaseConfig);
