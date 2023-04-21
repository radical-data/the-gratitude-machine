import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'FIREBASE_API_KEY<==',
	authDomain: 'the-gratitude-machine.firebaseapp.com',
	databaseURL: 'https://the-gratitude-machine-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'the-gratitude-machine',
	storageBucket: 'the-gratitude-machine.appspot.com',
	messagingSenderId: '970529816258',
	appId: '1:970529816258:web:3289ef8df32deeaa17055b'
};

const app = initializeApp(firebaseConfig);
