import React from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { RiPlayListAddLine, RiCloseCircleFill } from 'react-icons/ri';

export default class LikedSongs extends React.Component {
  constructor(props)
  {
    super(props);
    this.createPlaylist = this.createPlaylist.bind(this);
    this.state={playlistId:null};
  }
  createPlaylist(songId)
  {
    const req = {
      method: 'POST'
    }

    fetch('/spotify/create-playlist',req)
      .then(res => res.json())
      .then(data => {
        this.setState({playlistId:data.body.id});
        console.log(this.state.playlistId);
      });

  }
  addTracks(trackUri)
  {
    console.log(this.state.playlistId);
    console.log(trackUri);

    const req = {
      method: 'POST'
    }

    fetch(`/spotify/addTracks/${this.state.playlistId}/${[trackUri]}`, req)
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });

  }
  render() {
    // const songItems = this.props.likes.map(song =>
    //   <div key={song.songId}>
    //   <Row key={song.songId} className='padding-05'>
    //       <Col ><img className='listImage' src={song.imageUrl[2].url}></img></Col>
    //       <Col xs={3} className='align-center'><p>{song.songName}</p></Col>
    //       <Col className='align-center'><p>{song.artists[0].name}</p></Col>
    //     <Col >
    //       <div className='flex-start'>
    //         <button onClick={} className='no-style'><h3><RiCloseCircleFill className='sad-icon' /></h3></button>
    //         <button onClick={} className='no-style'><h3><RiPlayListAddLine className='green' /></h3></button>
    //       </div>
    //     </Col>
    //   </Row>
    // </div>
    // );
    const song = {
      "songName": "On My Way",
      "songId": "6TC0snyor5XOJzP6dGxRkn",
      "spotifyRedirectUrl": "https://open.spotify.com/track/6TC0snyor5XOJzP6dGxRkn",
      "releaseDate": "2017-08-04",
      "imageUrl": [
        {
          "height": 640,
          "url": "https://i.scdn.co/image/ab67616d0000b27339fadf2d03ca85cf9182142e",
          "width": 640
        },
        {
          "height": 300,
          "url": "https://i.scdn.co/image/ab67616d00001e0239fadf2d03ca85cf9182142e",
          "width": 300
        },
        {
          "height": 64,
          "url": "https://i.scdn.co/image/ab67616d0000485139fadf2d03ca85cf9182142e",
          "width": 64
        }
      ],
      "album": "Growing Pains",
      "artists": [
        {
          "external_urls": {
            "spotify": "https://open.spotify.com/artist/08v1r0jqDyvSo2LtSqHxcy"
          },
          "href": "https://api.spotify.com/v1/artists/08v1r0jqDyvSo2LtSqHxcy",
          "id": "08v1r0jqDyvSo2LtSqHxcy",
          "name": "Reo Cragun",
          "type": "artist",
          "uri": "spotify:artist:08v1r0jqDyvSo2LtSqHxcy"
        }
      ],
      "previewUrl": null,
      "trackUri": "spotify:track:6TC0snyor5XOJzP6dGxRkn"
    }
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
            <Row key={song.songId} className='padding-05'>
              <Col ><img className='listImage' src={song.imageUrl[2].url}></img></Col>
              <Col xs={3} className='align-center'><p>{song.songName}</p></Col>
              <Col className='align-center'><p>{song.artists[0].name}</p></Col>
              <Col >
                <div className='flex-start'>
                  {console.log('render',song.trackUri)}
                  <button onClick={() => {this.createPlaylist(song.songId)}} className='no-style'><h3><RiCloseCircleFill className='sad-icon' /></h3></button>
                  <button onClick={() => {this.addTracks(song.trackUri) }}className='no-style'><h3><RiPlayListAddLine className='green' /></h3></button>
                </div>
              </Col>
            </Row>

            {/* {songItems} */}
          </div>
        </Container>
      </>
    );
  }

}
