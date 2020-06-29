const axios = require('axios')

const vuex = localStorage.getItem('vuex')
const { user } = JSON.parse(vuex)

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` }
})

module.exports = api
