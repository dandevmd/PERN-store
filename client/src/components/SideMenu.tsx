import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import {
  getAllDevicesTypes,
  selectDeviceType,
} from '../app/reducers/shop/shopSlice'
import { ListGroup } from 'react-bootstrap'

const SideMenu = () => {
  const { devicesTypes, deviceType } = useAppSelector((state) => state.shop)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllDevicesTypes())
  }, [])

  return (
    <ListGroup>
      {devicesTypes.map((type, i) => {
        return (
          <ListGroup.Item
            style={{ cursor: 'pointer' }}
            key={i}
            active={deviceType.id === type.id}
            onClick={() => {
              const newType = {
                id: type.id,
                name: type.name,
                selected: true,
              }
              dispatch(selectDeviceType(newType))
            }}
          >
            {type.name}
          </ListGroup.Item>
        )
      })}
    </ListGroup>
  )
}

export default SideMenu
