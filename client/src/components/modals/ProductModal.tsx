import { useState, useEffect } from 'react'
import { Form, Dropdown, Button, Modal } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  getAllDevicesTypes,
  getBrands,
} from '../../app/reducers/shop/shopSlice'

const ProductModal: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { devicesTypes, devicesBrands } = useAppSelector((state) => state.shop)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (show) {
      dispatch(getAllDevicesTypes())
      dispatch(getBrands())
    }
  }, [show])

  const handleShow = () => setShow(!show)
  const addProduct = () => {}

  return (
    <>
      <Button variant="outline-dark" onClick={handleShow} className="my-3">
        Add new Product
      </Button>

      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Dropdown className="my-2">
              <Dropdown.Toggle>Select Type</Dropdown.Toggle>
              <Dropdown.Menu>
                {devicesTypes.map((type: { id: number; name: string }) => (
                  <Dropdown.Item key={type.id}>{type.name}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown className="my-2">
              <Dropdown.Toggle>Select Brand</Dropdown.Toggle>
              <Dropdown.Menu>
                {devicesBrands.map((brand: { id: number; name: string }) => (
                  <Dropdown.Item key={brand.id}>{brand.name}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Form.Control
              type="text"
              placeholder="Product name"
              className="my-2"
            />
            <Form.Control
              type="number"
              placeholder="Product price"
              className="my-2"
            />
            <Form.Control
              type="number"
              placeholder="Product rating"
              className="my-2"
            />
            <Form.Control
              type="file"
              placeholder="Upload Image"
              className="my-2"
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Close
          </Button>
          <Button variant="primary" onClick={addProduct}>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProductModal
