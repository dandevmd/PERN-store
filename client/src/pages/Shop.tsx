import { Row, Col, Container } from 'react-bootstrap'

import SideMenu from '../components/SideMenu'
import BrandMenu from '../components/BrandMenu'
import DeviceList from '../components/DeviceList'

const Shop: React.FC = (): JSX.Element => {
  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <SideMenu />
        </Col>
        <Col md={9}>
          <BrandMenu/>
          <DeviceList/>
        </Col>
      </Row>
    </Container>
  )
}

export default Shop
