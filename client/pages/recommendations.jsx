import React from 'react';
import SongInfo from '../components/song-info';
export default class Recommendations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      recommendations: [],
      likedSongs: [],
      error: false
    };
    this.handlechangeSong = this.handlechangeSong.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  componentDidMount() {
    if (this.props.params.get('genre') === '') {
      window.location.hash = '#song-form';
    }
    fetch(`/spotify/search/${this.props.params.get('song')}/${this.props.params.get('artist')}`)
      .then(res => res.json())
      .then(data => {
        fetch(`/spotify/recs/${data.artistId}/${data.SongId}/:${this.props.params.get('genre')}`)
          .then(res => res.json())
          .then(recommendationArray => {
            this.setState({ recommendations: recommendationArray });
          });
      })
      .catch(err => {
        this.setState({ error: true });
        console.error(err);
      });

  }

  endOfRecommendations() {
    window.location.hash = '#endOfRecommendations';
  }

  handlechangeSong(song) {
    let currentIndex = this.state.currentIndex;
    const likedSongs = this.state.likedSongs;
    currentIndex++;
    if (song !== null) {
      likedSongs.push(song);
    }
    if (currentIndex > 19) {
      this.handleLikes();
      this.endOfRecommendations();
    } else {
      this.setState({ currentIndex, likedSongs });
    }
  }

  handleLikes() {
    this.props.handleLikes(this.state.likedSongs);
  }

  handleError() {
    this.setState({ error: false });
    window.location.hash = '#song-form';
  }

  render() {
    return (
      <>
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
        {!this.state.error &&
          <>
            <div className='padding-0-1'>
              <h1 className='songify-header'>Recommendations</h1>
              {this.state.recommendations.length !== 0 &&
                <SongInfo changeSong={this.handlechangeSong} previewUrl={this.state.recommendations[this.state.currentIndex].previewUrl} recommendations={this.state.recommendations[this.state.currentIndex]}></SongInfo>
              }
              {this.state.recommendations.length === 0 &&
                <>
                  <div className='flex-column'>
                    <div className='flex-center'>
                      <h1 className='label'>Loading your recommendations!</h1>
                    </div>
                    <div className='flex-center'>
                      <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
                    </div>
                  </div>
                </>
              }
            </div>
          </>
        }

      </>
    );
  }
}
