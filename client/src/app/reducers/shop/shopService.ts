import axios from 'axios'

export const API_URL = 'http://localhost:5000/api'

//interfaces
export interface DeviceType {
  id: number
  name: string
  selected: boolean
}

export interface DeviceBrand {
  id: number
  name: string
  selected: boolean
}

export interface Device {
  id: number
  name: string
  price: number
  rating: number
  img: string
  type_id: number
  brand_id: number
}

//get all devices types
const getAllDevicesTypes = async () => {
  const response = await axios.get(`${API_URL}/type`)
  return response.data
}
//create new device type if user role = admin
const createDeviceType = async (deviceType: any) => {
  const user = localStorage.getItem('user')
  const parsedUser = user ? JSON.parse(user) : {}
  const token = parsedUser.token
  console.log(token, 'token')
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  const response = await axios.post(`${API_URL}/type`, deviceType, {headers})
  console.log(response.data,'RESPONSE')
}

//update device type if user role = admin
const updateDeviceType = async (deviceTypeId: number) => {
  const response = await axios.put(`${API_URL}/type/${deviceTypeId}`)
  return response.data
}
//delete device type if user role = admin
const deleteDeviceType = async (deviceTypeId: number) => {
  const response = await axios.delete(`${API_URL}/type/${deviceTypeId}`)
  return response.data
}

//get all brands
const getBrands = async () => {
  const response = await axios.get(`${API_URL}/brand`)
  return response.data
}
//create new device brand if user role = admin
const createDeviceBrand = async (deviceBrand: any) => {
  const user = localStorage.getItem('user')
  const parsedUser = user ? JSON.parse(user) : {}
  const token = parsedUser.token
  const headers = {
    Authorization: `Bearer ${token}`,
  }
  const {data} = await axios.post(`${API_URL}/brand`, {name:deviceBrand}, {headers})
  return data
}
//update device brand if user role = admin
//delete device brand if user role = admin

//get all devices
const getDevices = async () => {
  const response = await axios.get(`${API_URL}/device`)
  return response.data
}

export const shopService = {
  getAllDevicesTypes,
  getBrands,
  getDevices,
  createDeviceType,
  updateDeviceType,
  deleteDeviceType,
  createDeviceBrand,
}
