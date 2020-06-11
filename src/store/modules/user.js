const state = {
  name: null,
  photo: null,
  token: null
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
  }
}

export default {
  state,
  mutations
}
