const axios = require('axios')

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 7000,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use(async (config) => {
  // if (!config.url.endsWith('login')) {}
  const vuex = await localStorage.getItem('vuex')
  if (vuex) {
    const data = JSON.parse(vuex)
    config.headers.Authorization = `Bearer ${data.user.token}`
  }

  return config
}, (error) => {
  return Promise.reject(error)
})

export default api
