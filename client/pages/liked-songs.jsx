import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { RiPlayListAddLine } from 'react-icons/ri';

export default class LikedSongs extends React.Component {
  constructor(props) {
    super(props);

    this.addTracks = this.addTracks.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handlePlaylistSongs = this.handlePlaylistSongs.bind(this);
    this.state = { playlistId: null, currentAdd: [], currentLikes: [...this.props.likes], likesAdded: [] };
  }

  componentDidMount() {
    const req = {
      method: 'POST'
    };

    fetch('/spotify/create-playlist', req)
      .then(res => res.json())
      .then(data => {
        this.setState({ playlistId: data.body.id });
      })
      .catch(err => console.error(err));

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

  handleClick() {
    const req = {
      method: 'POST'
    };
    fetch(`/spotify/addTracks/${this.state.playlistId}/${this.state.currentAdd}`, req)
      .then(res => res.json())
      .catch(err => console.error(err));
    this.handlePlaylistSongs();
    window.location.hash = '#songify-playlist';
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
            <button onClick={this.handleClick} className='green-button padding-1 margin-2'>View Songify Playlist!</button>
          </Row>
        </Container>
      </>
    );
  }

}
