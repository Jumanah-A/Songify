import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FiPlayCircle, FiPauseCircle } from 'react-icons/fi';
import { FaRegSadCry } from 'react-icons/fa';
import { Howl } from 'howler';
export default class SongInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewPlay: false,
      audio: new Howl({
        src: [this.props.recommendations.previewUrl],
        html5: true
      })
    };
    this.handleClick = this.handleClick.bind(this);
    this.handlePlayPause = this.handlePlayPause.bind(this);
    this.handleAudio = this.handleAudio.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.recommendations.previewUrl !== prevProps.recommendations.previewUrl) {
      this.setState({
        audio: new Howl({
          src: [this.props.recommendations.previewUrl],
          html5: true
        }),
        previewPlay: false
      });
    }
  }

  handleClick(event) {
    this.state.audio.stop();
    if (event.target.id === 'skip-song') {
      this.props.changeSong(null);
    } else {
      this.props.changeSong(this.props.recommendations);
    }
  }

  handleAudio(state) {
    if (state) {
      this.state.audio.play();
    } else {
      this.state.audio.pause();
    }
  }

  handlePlayPause() {
    this.handleAudio(!this.state.previewPlay);
    this.setState(prevState => ({
      previewPlay: !prevState.previewPlay
    }));
  }

  render() {
    const { songName, artists, album, releaseDate, imageUrl } = this.props.recommendations;
    return (
    <>
    <Container>
      <Row xs={1} md={2} className="padding-1">
        <Col className={window.innerWidth <= 767 ? 'flex-normal' : 'space-evenly'}>
          <img src={imageUrl[1].url}></img>
        </Col>
        <Col className={window.innerWidth <= 767 ? 'flex-normal' : 'space-between'}>
        <div className='flex-column flex-center padding-1'>
          <h3>Name: {songName}</h3>
          <h3>Artists: {artists[0].name}</h3>
          <h3>Album: {album}</h3>
          <h3>Year: {releaseDate.substring(0, 4)}</h3>
          <div className='align-center'>
            {this.props.recommendations.previewUrl !== null && !this.state.previewPlay &&
            <>
              <button className='no-style' onClick={this.handlePlayPause}><FiPlayCircle className='play-pause'/></button>
              <h6 className='songify-header padding-left'>Play song preview</h6>
            </>
            }
            {this.props.recommendations.previewUrl !== null && this.state.previewPlay &&
            <>
              <button className='no-style' onClick={this.handlePlayPause}><FiPauseCircle className='play-pause'/></button>
              <h6 className='songify-header padding-left'>Play song preview</h6>
              </>
            }
            {this.props.recommendations.previewUrl === null &&
            <>
              <span className='icon'><FaRegSadCry className=' sad-icon'/></span><h6 className='green'> Song preview is not available </h6>
              </>
            }
          </div>

        </div>
        </Col>
      </Row>
      <Row className='space-around padding-1'>
        <button id='skip-song' onClick={this.handleClick} className='green-button no'>Meh...not my vibe</button>
        <button id='like-song' onClick={this.handleClick} className='green-button'>Love it!</button>
      </Row>
    </Container>
    </>);
  }
}
