import React from 'react';
import { Row, Container } from 'react-bootstrap';

export default function Welcome(props) {

  const handleClick = () => {
    // eslint-disable-next-line
    console.log("Get recommendation button is pressed!")
    window.location.href = '#song-form';
    // return the song-form component

  };
  return (
    <div className='flex-center'>
      <Container>
        <Row>
          <h1 className='text-center'>Welcome {props.name}!</h1>
        </Row>
        <Row>
          <div className='flex-center'>
            <button onClick={handleClick} className='green-button margin-3 padding-1'><h6> <i className="bi bi-music-note-beamed white"></i>  Get song recommendations! </h6><a href='#song-form'></a></button>
          </div>
        </Row>
      </Container>
    </div>
  );

}
