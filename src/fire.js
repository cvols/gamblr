import firebase from 'firebase';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBrTJsQglyHj363IF1glHoUzJkU0hguwoY',
  authDomain: 'gamblr-8e548.firebaseapp.com',
  databaseURL: 'https://gamblr-8e548.firebaseio.com',
  projectId: 'gamblr-8e548',
  storageBucket: 'gamblr-8e548.appspot.com',
  messagingSenderId: '332411818676',
  appId: '1:332411818676:web:248ca2d8e3f30ab18ffde1',
  measurementId: 'G-H7Y9VS550C'
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default fire;
