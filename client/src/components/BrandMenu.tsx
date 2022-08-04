import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { getBrands, selectDeviceBrand } from '../app/reducers/shop/shopSlice'
import { Card, Row } from 'react-bootstrap'

const BrandMenu = () => {
  const dispatch = useAppDispatch()
  const { devicesBrands, deviceBrand } = useAppSelector((state) => state.shop)

  useEffect(() => {
    dispatch(getBrands())
  }, [])


  return (
    <Row className="d-flex">
      {devicesBrands.map((brand, i) => (
        <Card
          style={{ cursor: 'pointer', width:'20%', marginLeft:'1%'}}
          key={i}
          border={deviceBrand.id === brand.id ? 'danger' : 'light'}
          onClick={() => {
            const newBrand = {
              id: brand.id,
              name: brand.name,
              selected: true,
            }
            dispatch(selectDeviceBrand(newBrand))
          }}
        >
          {brand.name}
        </Card>
      ))}
    </Row>
  )
}

export default BrandMenu
