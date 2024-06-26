import axios from 'axios'
import { getToken, handleTokenError } from './storage'

const baseInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
})

baseInstance.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

baseInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      handleTokenError()
    }
    return Promise.reject(error)
  }
)

export default baseInstance
