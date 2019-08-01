import firebase from "firebase";
import Rebase from 're-base';


// Your web app's Firebase configuration

  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig)
  const base = Rebase.createClass(app.database())

  export { base }

