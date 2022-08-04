import React from 'react'
import { Col, Container, Image, Row, Card, Button } from 'react-bootstrap'

const Device: React.FC = ():JSX.Element => {
  const device ={id:1, price:100, name:'huilo', img:'https://via.placeholder.com/150', rating:5}
  const info = [
    {id:1, description:'jil dil bir'},
  {id:2, description:'jil can bir'}
]

  return (
    <Container className='pt-2'>
      <Row>
        {' '}
        <Col md={3}>
          <Image width={200} height={200} />
        </Col>
        <Col md={4} className='d-flex justify-content-between align-items-start mx-4'>
          
            <h2>{device.name}</h2>
            <div className="d-flex flex-row justify-content-between">
             &#11088;{device.rating}
            </div>
            
          
        </Col>
        <Col md={3}>
          <Card
          className="d-flex flex-column align-items-center justify-content-around"
          style={{width: '205px', height: '205px', border: '3px solid lightgray'}}
          >
            <h3>Price:{device.price}</h3>
            <Button variant={'outline-dark'}>Add to cart</Button>
          </Card>
        </Col>
      </Row>

      <Row className='d-flex flex-column m-3'>
        {info.map(item => (
          <div key={item.id}>
            <h3>Specifications</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci tenetur tempore deleniti tempora, delectus ab nihil facere reprehenderit voluptatibus praesentium esse quasi, perferendis accusantium sunt possimus architecto magnam labore! Deleniti?</p>
          </div>
        ))}
      </Row>
    </Container>
  )
}

export default Device
