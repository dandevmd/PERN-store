import { useState, useEffect } from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import { createBrand } from '../../app/reducers/shop/shopSlice';
import {Button,Modal, Form} from 'react-bootstrap';

const BrandModal:React.FC = ():JSX.Element=> {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');


  const handleShow = () => setShow(!show);
  const addBrand = () => {
    dispatch(createBrand(text));
  }


  return (
    <>
      <Button variant="outline-dark" onClick={handleShow} className='my-3'>
        Add new Brand
      </Button>

      <Modal show={show} onHide={handleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product Brand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Control
              type="text"
              placeholder="New brand name"
              className="my-2"
              value={text}
              onChange={(e:React.ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleShow}>
            Close
          </Button>
          <Button variant="primary" onClick={addBrand}>
            Add Brand
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BrandModal