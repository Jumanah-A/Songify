import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { RiPlayListAddLine, RiCloseCircleFill } from 'react-icons/ri';

export default class LikedSongs extends React.Component {
  render() {
    const songItems = this.props.likes.map(song =>
      <div key={song.songId}>
      <Row key={song.songId} className='padding-05'>
          <Col ><img className='listImage' src={song.imageUrl[2].url}></img></Col>
          <Col xs={3} className='align-center'><p>{song.songName}</p></Col>
          <Col className='align-center'><p>{song.artists[0].name}</p></Col>
        <Col >
          <div className='flex-start'>
            <h3><RiCloseCircleFill className='sad-icon' /></h3>
            <h3><RiPlayListAddLine className='green' /></h3>
          </div>
        </Col>
      </Row>
    </div>
    );
    return (
      <>
        <div className='padding-0-1'>
          <h1 className='songify-header'>Liked Recommendations</h1>
        </div>
        <Container >
          <Row className='padding-0-1'>
            <Col ><h4>Cover</h4></Col>
            <Col xs={3}><h4>Title</h4></Col>
            <Col ><h4>Artist</h4></Col>
            <Col><h4>Add to playlist?</h4></Col>
          </Row>
          <div className='padding-1'>
            {songItems}
          </div>
        </Container>
      </>
    );
  }

}
