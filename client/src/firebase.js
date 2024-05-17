import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyD8Fm5veF_AoNdThCMcqxn7VyUQ5nEAkv8",
  authDomain: "website-9adfc.firebaseapp.com",
  projectId: "website-9adfc",
  storageBucket: "website-9adfc.appspot.com",
  messagingSenderId: "874176053434",
  appId: "1:874176053434:web:6e11ba78bb7a5f2130c283",
  measurementId: "G-25PBJHC8VN"
})

export const auth = app.auth()
export default app

