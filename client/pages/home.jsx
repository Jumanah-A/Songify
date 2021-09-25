import React from 'react';
import { RiSpotifyFill } from 'react-icons/ri';
import { Row, Container } from 'react-bootstrap';

export default function Home(props) {
  const handleClick = () => {
    window.location.href = '/auth/spotify';

  };
  return (
    <>
    <div className='center'>
      <Container>
        <Row className='padding-1'>
          <h1>Welcome to <span className='green'>Songify</span></h1>
        </Row>
        <Row className='padding-1'>
          <h2>Get a fresh set of recommendations based on your favorite song, artist and genre.</h2>
        </Row>
        <Row className='padding-1'>
          <h2>Sign in to your Spotify account to get started!</h2>
        </Row>
        <Row className='padding-1'>
          <div className='flex-end padding-1'>
            <button onClick={handleClick} className='green-button'>  <h2><RiSpotifyFill className='spotify-icon' />Sign in to Spotify</h2><a href='/auth/spotify'></a></button>
          </div>
        </Row>
      </Container>
    </div>
    </>
  );
}
