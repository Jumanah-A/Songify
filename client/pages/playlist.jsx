import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { RiSpotifyFill } from 'react-icons/ri';

export default class Playlist extends React.Component {
  render() {
    const songItems = this.props.likes.map(song =>
      <div key={song.songId}>
        <Row key={song.songId} className='padding-05'>
          <Col ><img className='listImage' src={song.imageUrl[2].url}></img></Col>
          <Col xs={3} className='align-center'><p>{song.songName}</p></Col>
          <Col className='align-center'><p>{song.artists[0].name}</p></Col>
          <Col >
            <div className='flex-start'>
              <button><RiSpotifyFill/></button>
            </div>
          </Col>
        </Row>
      </div>
    );
    return (
      <>
        <div className='padding-0-1'>
          <h1 className='songify-header'>Songify Playlist</h1>
        </div>
        <Container >
          <Row className='padding-0-1'>
            <Col ><h4>Cover</h4></Col>
            <Col xs={3}><h4>Title</h4></Col>
            <Col ><h4>Artist</h4></Col>
            <Col><h4>Listen on Spotify</h4></Col>
          </Row>
          <div className='padding-1'>
            {songItems}
          </div>
          <Row className='flex-center'>
          </Row>
        </Container>
      </>
    );
  }
}
