/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import axios from 'axios'

import { store } from '../store/mainStore'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_REMOTE,
  // baseURL: "http://192.168.0.114:7000/api/v1",
  // baseURL : 'https://api.dev.dim.dev/api/v1/',
  withCredentials: false,
  headers: {
    accept: 'application/json',
  },
})

instance.interceptors.request.use((config) => {
  const token = store.getters.getToken
  if (token) config.headers.Authorization = token
  return config
})

/*
instance.interceptors.response.use(
  res=> res,
  err=>{
      console.log(err)
  })
*/

export default instance
