import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCqnhw7UloLOLQ_fhosEfSo3YQDsnfRrNg",
    authDomain: "recettes-app-7946d.firebaseapp.com",
    databaseURL: "https://recettes-app-7946d.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database())

// This is a named export
export { firebaseApp }

// this is a default export
export default base
