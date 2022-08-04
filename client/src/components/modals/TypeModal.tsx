import { ChangeEvent, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { createType } from '../../app/reducers/shop/shopSlice'
import { Button, Modal, Form } from 'react-bootstrap'

const TypeModal: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [text, setText] = useState('')
  const [show, setShow] = useState(false)

 

  const handleShow = () => setShow(!show)
  const addType = () => {
    dispatch(createType(text))
  }

  return (
    <>
      <Button variant="outline-dark" onClick={handleShow} className="my-3">
        Add new Type
      </Button>

      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              type="text"
              placeholder="New type name"
              className="my-2"
              value={text}
              onChange={(e:ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Close
          </Button>
          <Button variant="primary" onClick={addType}>
            Add Type
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default TypeModal
