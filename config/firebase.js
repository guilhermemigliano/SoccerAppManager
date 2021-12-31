// Initialize Cloud Firestore through Firebase
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {}

const firebaseApp = initializeApp(firebaseConfig)

const db = getFirestore()

export default db
