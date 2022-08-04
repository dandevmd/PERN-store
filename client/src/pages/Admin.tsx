import { useState } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'

import TypeModal from '../components/modals/TypeModal'
import ProductModal from '../components/modals/ProductModal'
import BrandModal from '../components/modals/BrandModal'

const Admin: React.FC = () => {
  return (
    <Container className="d-flex flex-column my-3">
      <TypeModal />
      <BrandModal />
      <ProductModal />
    </Container>
  )
}

export default Admin
