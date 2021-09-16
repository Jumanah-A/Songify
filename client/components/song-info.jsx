import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FiPlayCircle } from 'react-icons/fi';
export default class SongInfo extends React.Component {
  constructor(props) {
    super(props);
    this.parent = this.props;
    // console.log(this.props)
  }

  handleClick(event) {
    if (event.target.id === 'skip-song') {
      // console.log("hi in skip")
      // console.log(this.parent)
      this.props.changeSong();
    } else {
      // console.log("hi in skip")
      this.props.changeSong();
    }
  }

  render() {
    const { songName, artists, album, releaseDate, imageUrl } = this.props.recommendations;
    return (
    <>
    <Container>
      <Row xs={1} md={2} className="padding-1">
        <Col className={window.innerWidth <= 767 ? 'flex-center' : 'space-evenly'}>
          <img src={imageUrl[1].url}></img>
        </Col>
        <Col className={window.innerWidth <= 767 ? 'flex-center' : 'space-between'}>
        <div className='flex-column flex-center'>
          <h3>Name: {songName}</h3>
          <h3>Artists: {artists[0].name}</h3>
          <h3>Album: {album}</h3>
          <h3>Year: {releaseDate}</h3>
          <div className='flex-center align-center'>
            <FiPlayCircle className='play-pause'/>
            <h6 className='songify-header padding-left'>Play song preview</h6>
          </div>

        </div>
        </Col>
      </Row>
      <Row className='space-evenly padding-1'>
        <button id='skip-song' onClick={this.handleClick} className='green-button no'>Meh...not my vibe</button>
        <button id='like-song' onClick={this.handleClick} className='green-button'>Love it!</button>
      </Row>
    </Container>
    </>);
  }
}
