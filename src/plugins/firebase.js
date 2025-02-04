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
    try {
      const provider = new firebase.auth.FacebookAuthProvider()
      const user = await firebase.auth().signInWithPopup(provider)
      return user
    } catch (error) {
      throw error
    }
  }

  async loginGoogle () {
    try {
      const provider = new firebase.auth.GoogleAuthProvider()
      provider.addScope('profile')
      const user = await firebase.auth().signInWithPopup(provider)
      return user
    } catch (error) {
      throw error
    }
  }

  async getTokenFirebase () {
    try {
      const token = firebase.auth().currentUser.getIdToken()
      return token
    } catch (error) {
      throw error
    }
  }

  async logout () {
    try {
      await firebase.auth().signOut()
      return true
    } catch (error) {
      throw error
    }
  }
}

export default new Firebase()
