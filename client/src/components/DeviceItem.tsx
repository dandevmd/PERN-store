import React from 'react'
import {useNavigate, NavLink} from 'react-router-dom'
import { Col, Image, Card } from 'react-bootstrap'
import { Device } from '../app/reducers/shop/shopService'

interface DeviceItemProps {
  device: Device
}

const DeviceItem: React.FC<DeviceItemProps> = ({ device }): JSX.Element => {
  const navigate = useNavigate()
  const itemURL =`/api/device/${device.id}`

  return (
    <Col md={3} className="mt-3" onClick={()=>navigate(itemURL)}>
      <Card
        style={{
          cursor: 'pointer',
          width: '150',
        }}
        border={'light'}
        className='p-2'
      >
        <Image width={140} height={140} src={device.img} />
        <div className='d-flex justify-content-between mt-2'>
          <div>Apple...</div>
          <div className='d-flex align-items-center'>
            <div>{device.rating}</div>
            <div>&#11088;</div>
          </div>
        </div>
          <div >{device.name}</div>
      </Card>
    </Col>
  )
}

export default DeviceItem
