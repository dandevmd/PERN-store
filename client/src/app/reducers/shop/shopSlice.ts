import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { shopService, Device, DeviceType, DeviceBrand } from './shopService'
import jwt_decode from 'jwt-decode'

const initialState = {
  devicesTypes: [] as DeviceType[],
  deviceType: {
    id: 2,
    name: '',
    selected: false,
  } as DeviceType,
  devicesBrands: [] as DeviceBrand[],
  deviceBrand: {
    id: 1,
    name: '',
    selected: false,
  } as DeviceBrand,
  devices: [] as Device[],
  device: {
    id: 0,
    name: '',
    price: 0,
    rating: 0,
    img: '',
    type_id: 0,
    brand_id: 0,
  } as Device,

  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
}

// get all devices types
export const getAllDevicesTypes = createAsyncThunk('/type', async () => {
  try {
    return await shopService.getAllDevicesTypes()
  } catch (error) {
    if (error instanceof Error) return console.log(error.message)
  }
})

// create new device type
export const createType = createAsyncThunk('/type', async (deviceType: any) => {
  try {
    return await shopService.createDeviceType(deviceType)
  } catch (error) {
    if (error instanceof Error) return console.log(error)
  }
})

//get all brands
export const getBrands = createAsyncThunk('/brand', async () => {
  try {
    return await shopService.getBrands()
  } catch (error) {
    if (error instanceof Error) return console.log(error.message)
  }
})

// create new device brand
export const createBrand = createAsyncThunk(
  '/brand',
  async (deviceBrand: any) => {
    try {
      return await shopService.createDeviceBrand(deviceBrand)
    } catch (error) {
      if (error instanceof Error) return console.log(error)
    }
  },
)

//get all devices
export const getDevices = createAsyncThunk('/device', async () => {
  try {
    const devices = await shopService.getDevices()
    return devices
  } catch (error) {
    if (error instanceof Error) return console.log(error.message)
  }
})

export const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    resetShopState: (state: any) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
    selectDeviceType: (state: any, action: any) => {
      state.deviceType = action.payload
    },
    selectDeviceBrand: (state: any, action: any) => {
      state.deviceBrand = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllDevicesTypes.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getAllDevicesTypes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.devicesTypes = action.payload as DeviceType[]
      })
      .addCase(getAllDevicesTypes.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
      })
      .addCase(getBrands.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.devicesBrands = action.payload as DeviceBrand[]
      })
      .addCase(getBrands.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
      })
      .addCase(getDevices.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getDevices.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.devices = action.payload as Device[]
      })
      .addCase(getDevices.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload as string
      })
  },
})

export const {
  resetShopState,
  selectDeviceType,
  selectDeviceBrand,
} = shopSlice.actions
export default shopSlice.reducer
