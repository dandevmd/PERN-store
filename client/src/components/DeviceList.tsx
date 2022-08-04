import {useEffect} from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getDevices } from '../app/reducers/shop/shopSlice'
import { Row } from 'react-bootstrap'

import DeviceItem from './DeviceItem'
import { Device } from '../app/reducers/shop/shopService'

const DeviceList = () => {
  const dispatch = useAppDispatch()
  const { devices } = useAppSelector((state) => state.shop)

  useEffect(() => {
    dispatch(getDevices())
  }, [])

  return (
    <Row>
      {devices.map((device, i) => (
        <DeviceItem device={device} key={i} />
      ))}
    </Row>
  )
}

export default DeviceList
