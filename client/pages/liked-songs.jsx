import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { RiPlayListAddLine } from 'react-icons/ri';

export default class LikedSongs extends React.Component {
  constructor(props) {
    super(props);

    this.addTracks = this.addTracks.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePlaylistSongs = this.handlePlaylistSongs.bind(this);
    this.playlistRedirect = this.playlistRedirect.bind(this);
    this.handleError = this.handleError.bind(this);
    this.state = { playlistId: null, currentAdd: [], currentLikes: [...this.props.likes], likesAdded: [], playlistRedirect: null, error: false };
  }

  componentDidMount() {
    const req = {
      method: 'POST'
    };

    fetch('/spotify/create-playlist', req)
      .then(res => res.json())
      .then(data => {
        this.setState({ playlistId: data.body.id, playlistRedirect: data.body.external_urls.spotify });

      })
      .catch(err => {
        this.setState({ error: true });
        console.error(err);
      });

  }

  addTracks(trackUri, trackId, index, song) {
    const current = this.state.currentLikes;
    current.splice(index, 1);
    const temp = this.state.currentAdd;
    temp.push(trackUri);
    const added = this.state.likesAdded;
    added.push(song);
    this.setState({ currentLikes: current, currentAdd: temp, likesAdded: added });

  }

  handlePlaylistSongs() {
    this.props.handlePlaylistSongs(this.state.likesAdded);
  }

  playlistRedirect() {
    this.props.playlistRedirect(this.state.playlistRedirect);
  }

  handleClick() {
    const req = {
      method: 'POST'
    };
    fetch(`/spotify/addTracks/${this.state.playlistId}/${this.state.currentAdd}`, req)
      .then(res => res.json())
      .catch(err => {
        console.error(err);
        this.setState({ error: true });
      });
    this.handlePlaylistSongs();
    this.playlistRedirect();
    window.location.hash = '#songify-playlist';
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
    const songItems = this.state.currentLikes.map(song =>
      <div key={song.songId}>
      <Row key={song.songId} className='padding-05'>
          <Col ><img className='listImage' src={song.imageUrl[2].url}></img></Col>
          <Col xs={3} className='align-center'><p>{song.songName}</p></Col>
          <Col className='align-center'><p>{song.artists[0].name}</p></Col>
        <Col >
          <div className='flex-start'>
              <button onClick={() => { this.addTracks(song.trackUri, song.songId, this.state.currentLikes.indexOf(song), song); }} className='no-style'><h3><RiPlayListAddLine className='green' /></h3></button>
          </div>
        </Col>
      </Row>
    </div>
    );
    return (
      <>
      { !this.state.error &&
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
          <Row className='flex-center'>
            <button onClick={this.handleClick} className='green-button padding-1 margin-2'><h4>View Songify Playlist!</h4></button>
          </Row>
        </Container>
      </>
      }
      { this.state.error &&
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
