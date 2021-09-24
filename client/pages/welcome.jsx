import React from 'react';
import { Row, Container } from 'react-bootstrap';

export default function Welcome(props) {
  return (
    <div className='flex-center'>
      <Container>
        <Row>
          <h1 className='text-center'>Welcome {props.name}!</h1>
        </Row>
        <Row>
          <div className='flex-center'>
            <a className='green-button margin-2 padding-1'href='#song-form'><h6> <i className="bi bi-music-note-beamed white"></i>  Get song recommendations! </h6></a>
          </div>
        </Row>
      </Container>
    </div>
  );

}
