import React from 'react';
import SongInfo from '../components/song-info';
export default class Recommendations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      recommendations: []
    };
    this.handlechangeSong = this.handlechangeSong.bind(this);
  }

  componentDidMount() {
    fetch(`/spotify/search/${this.props.params.get('song')}/${this.props.params.get('artist')}`)
      .then(res => res.json())
      .then(data => {
        fetch(`/spotify/recs/${data.artistId}/${data.SongId}/:${this.props.params.get('genre')}`)
          .then(res => res.json())
          .then(recommendationArray => {
            this.setState({ recommendations: recommendationArray });
          });

      });

  }

  endOfRecommendations() {
    window.location.hash = '#endOfRecommendations';
  }

  handlechangeSong() {
    let currentIndex = this.state.currentIndex;
    currentIndex++;
    if (currentIndex > 19) {
      this.endOfRecommendations();
    } else {
      this.setState({ currentIndex });
    }
  }

  render() {
    return (
    <>
    <div className='padding-1'>
      <h1 className='songify-header padding-3'>Recommendations</h1>
      {this.state.recommendations.length !== 0 &&
      <SongInfo changeSong={this.handlechangeSong} recommendations={this.state.recommendations[this.state.currentIndex]}></SongInfo>
      }
    </div>

    </>);

  }
}
