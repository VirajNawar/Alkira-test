import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';

function MydModalWithGrid(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Cavaliers
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col >
              Team Full Name : 
            </Col>
            <Col >
             selectedGame.home_team.name
            </Col>
          </Row>
        
         <Row>
            <Col >
              Team Full Name : 
            </Col>
            <Col >
             selectedGame.home_team.name
            </Col>
          </Row>
          <Modal.Title id="contained-modal-title-vcenter">
          Random Game
        </Modal.Title>
         <Row>
            <Col >
              Home Team : 
            </Col>
            <Col >
             selectedGame.home_team.name
            </Col>
          </Row>
         <Row>
            <Col >
              Home Team : 
            </Col>
            <Col >
             selectedGame.home_team.name
            </Col>
          </Row>
          
           <Row>
            <Col >
              Home Team : 
            </Col>
            <Col >
             selectedGame.home_team.name
            </Col>
          </Row>
          
           <Row>
            <Col >
              Home Team : 
            </Col>
            <Col >
             selectedGame.home_team.name
            </Col>
          </Row>
          
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function App() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch modal with grid
      </Button>

      <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}

render(<App />);