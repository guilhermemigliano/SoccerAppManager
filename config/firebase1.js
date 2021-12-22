// Initialize Cloud Firestore through Firebase
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyAO-8kDLzdn-dcgNQnwdML3uRchRR8usL0',
  authDomain: 'app-fdk.firebaseapp.com',
  projectId: 'app-fdk',
  storageBucket: 'app-fdk.appspot.com',
  messagingSenderId: '185317751235',
  appId: '1:185317751235:web:3d95135b6e243e06366576'
})

const db1 = getDatabase()

export default db1
