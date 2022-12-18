import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCyRhmgleXKW6HnFqaMgwy3vTLS3jMRWFM",
  authDomain: "sistema-chamados-36486.firebaseapp.com",
  projectId: "sistema-chamados-36486",
  storageBucket: "sistema-chamados-36486.appspot.com",
  messagingSenderId: "732187291935",
  appId: "1:732187291935:web:d194445d0118e688af802a",
  measurementId: "G-RV6Q70P7YT"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase;