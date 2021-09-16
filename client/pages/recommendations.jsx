import React from 'react';
import SongInfo from '../components/song-info';
export default class Recommendations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      recommendations: [],
      currentSong: {}
    };
    this.handlechangeSong = this.handlechangeSong.bind(this);
  }

  componentDidMount() {
    const urlSearchParams = new URLSearchParams(window.location.hash);
    const params = Object.fromEntries(urlSearchParams.entries());
    const { artist, genre } = params;
    const song = params['#recommendations?song'];

    fetch(`/spotify/search/${song}/${artist}`)
      .then(res => res.json())
      .then(data => {
        fetch(`/spotify/recs/${data.artistId}/${data.SongId}/:${genre}`)
          .then(res => res.json())
          .then(recommendationArray => {
            this.setState({ recommendations: recommendationArray });
          });

      });

  }

  handleCurrent() {
    this.setState({ currentSong: this.recommendations[this.currentIndex] });
  }

  handlechangeSong() {
    // console.log('in callback')
    let currentIndex = this.state.currentIndex;
    currentIndex++;
    const currentSong = this.state.recommendations[currentIndex];
    this.setState({ currentIndex, currentSong });
  }

  render() {
    const recommendations = this.state.recommendations;
    return (
    <>
    <div className='padding-1'>
      <h1 className='songify-header padding-3'>Recommendations</h1>
      {recommendations.length !== 0 &&
      <SongInfo changeSong={this.handlechangeSong} recommendations={recommendations[this.state.currentIndex]}></SongInfo>
      }
    </div>

    </>);

  }
}
