const app = require('@firebase/app')
require('@firebase/auth')
// require('@firebase/analytics')

const firebase = app.firebase

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
}

class Firebase {
  constructor () {
    firebase.initializeApp(firebaseConfig)
    // firebase.analytics()
    console.log('firebase iniciado')
  }

  async loginFacebook () {
    const provider = new firebase.auth.FacebookAuthProvider()
    firebase.auth().signInWithPopup(provider).then((result) => {
      return result
    }).catch((error) => {
      console.log(error)
    })
  }

  async loginGoogle () {
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('profile')
    provider.addScope('email')
    firebase.auth().signInWithPopup(provider).then((result) => {
      console.log(result)
      const credencials = result.credential.toJSON()
      console.log(credencials.oauthAccessToken)
      console.log(credencials.oauthIdToken)
      return result
    }).catch((error) => {
      return error
    })
  }

  async getTokenFirebase () {
    firebase.auth().currentUser.getIdToken().then((idToken) => {
      return idToken
    }).catch((error) => {
      return error
    })
  }

  async logout () {
    firebase.auth().signOut().then(() => {
      return true
    }).catch((error) => {
      return error
    })
  }
}

export default new Firebase()
