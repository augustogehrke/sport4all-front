const state = {
  name: null,
  photo: null,
  token: null,
  uid: null
}

const mutations = {
  setName (state, name) {
    state.name = name
  },
  setPhoto (state, photo) {
    state.photo = photo
  },
  setToken (state, token) {
    state.token = token
  },
  setUid (state, uid) {
    state.uid = uid
  }
}

export default {
  state,
  mutations
}
