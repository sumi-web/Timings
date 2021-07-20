import firebase from "firebase";

const firebaseConfig = {
	apiKey: "AIzaSyCrfZ6r6_E5-1KCBM5Zn3rmNzS03Oyu_-s",
	authDomain: "attendance-tracker-ae847.firebaseapp.com",
	projectId: "attendance-tracker-ae847",
	storageBucket: "attendance-tracker-ae847.appspot.com",
	messagingSenderId: "1046074169070",
	appId: "1:1046074169070:web:ec0cd7eda624e1695e05ff",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

export { db, auth };
