import firebase from 'firebase/app'
import 'firebase/auth'
import keys from './keys'

// Firebase config
const config = {
  apiKey: keys.firebaseApiKey,
  authDomain: keys.firebaseAuthDomain,
  databaseURL: keys.firebaseDatabaseUrl,
  projectId: keys.firebaseProjectId,
  storageBucket: keys.firebaseStorageBucket,
  messagingSenderId: keys.firebaseMessagingSenderId
}

// Initialize Firebase
export default firebase.initializeApp(config)
