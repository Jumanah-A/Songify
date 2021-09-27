import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { RiSpotifyFill } from 'react-icons/ri';

export default class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
    this.handleClick = this.handleClick.bind(this);
    this.redirectPlaylist = this.redirectPlaylist.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  handleClick(redirectUrl) {
    window.open(redirectUrl);
  }

  redirectPlaylist() {
    if (this.props.playlistRedirect !== null) {
      window.open(this.props.playlistRedirect);
    } else {
      this.setState({ error: true });
    }
  }

  handleError() {
    this.setState({ error: false });
    fetch('/auth/logout')
      .then(res => {
        document.cookie = 'userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.href = '/';
      })
      .catch(err => console.error(err));
  }

  render() {
    const songItems = this.props.playlistSongs.map(song =>
      <div key={song.songId}>
        <Row key={song.songId} className='padding-05'>
          <Col ><img src={song.imageUrl[2].url}></img></Col>
          <Col xs={3} className='align-center'><p>{song.songName}</p></Col>
          <Col className='align-center'><p>{song.artists[0].name}</p></Col>
          <Col >
            <div className='flex-start'>
              <button onClick={() => { this.handleClick(song.spotifyRedirectUrl); }} className='no-style'><h3 className='padding-2'><RiSpotifyFill className='green' /></h3></button>
            </div>
          </Col>
        </Row>
      </div>
    );
    return (
      <>
      {!this.state.error &&
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
            <button onClick={this.redirectPlaylist} className='green-button padding-1 margin-2'><h4><RiSpotifyFill className='spotify-icon' />View Playlist on Spotify</h4></button>
          </Row>
        </Container>
        </>
        }
        {this.state.error &&
        <>
          <div className='flex-column'>
            <div className='flex-center'>
              <h1 className='label'>Sorry an error occurred while processing your request</h1>
            </div>
            <div className='flex-center'>
              <button className='green-button margin-2 padding-1' onClick={this.handleError} ><h6> Try Again </h6></button>
            </div>
          </div>
        </>
        }
      </>
    );
  }
}
