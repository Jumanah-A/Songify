import React from 'react';
import { Container, Row } from 'react-bootstrap';
import Select from 'react-select';

const genres = [
  'acoustic',
  'afrobeat',
  'alt-rock',
  'alternative',
  'ambient',
  'anime',
  'black-metal',
  'bluegrass',
  'blues',
  'bossanova',
  'brazil',
  'breakbeat',
  'british',
  'cantopop',
  'chicago-house',
  'children',
  'chill',
  'classical',
  'club',
  'comedy',
  'country',
  'dance',
  'dancehall',
  'death-metal',
  'deep-house',
  'detroit-techno',
  'disco',
  'disney',
  'drum-and-bass',
  'dub',
  'dubstep',
  'edm',
  'electro',
  'electronic',
  'emo',
  'folk',
  'forro',
  'french',
  'funk',
  'garage',
  'german',
  'gospel',
  'goth',
  'grindcore',
  'groove',
  'grunge',
  'guitar',
  'happy',
  'hard-rock',
  'hardcore',
  'hardstyle',
  'heavy-metal',
  'hip-hop',
  'holidays',
  'honky-tonk',
  'house',
  'idm',
  'indian',
  'indie',
  'indie-pop',
  'industrial',
  'iranian',
  'j-dance',
  'j-idol',
  'j-pop',
  'j-rock',
  'jazz',
  'k-pop',
  'kids',
  'latin',
  'latino',
  'malay',
  'mandopop',
  'metal',
  'metal-misc',
  'metalcore',
  'minimal-techno',
  'movies',
  'mpb',
  'new-age',
  'new-release',
  'opera',
  'pagode',
  'party',
  'philippines-opm',
  'piano',
  'pop',
  'pop-film',
  'post-dubstep',
  'power-pop',
  'progressive-house',
  'psych-rock',
  'punk',
  'punk-rock',
  'r-n-b',
  'rainy-day',
  'reggae',
  'reggaeton',
  'road-trip',
  'rock',
  'rock-n-roll',
  'rockabilly',
  'romance',
  'sad',
  'salsa',
  'samba',
  'sertanejo',
  'show-tunes',
  'singer-songwriter',
  'ska',
  'sleep',
  'songwriter',
  'soul',
  'soundtracks',
  'spanish',
  'study',
  'summer',
  'swedish',
  'synth-pop',
  'tango',
  'techno',
  'trance',
  'trip-hop',
  'turkish',
  'work-out',
  'world-music'
];

export default class SongForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { song: '', artist: '', genre: '', noOfRecommendations: 10 };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if (event.target) {
      const { name, value } = event.target;
      this.setState({ [name]: value });

    } else {
      const { name, value } = event;
      this.setState({ [name]: value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const searchParams = new URLSearchParams(this.state);
    const queryString = '?' + searchParams.toString();
    window.location.hash = '#recommendations' + queryString;
  }

  render() {
    const customStyle = {
      singleValue: () => {
        return { color: 'white' };
      },
      option: styles => {
        return {
          background: '#464646',
          color: 'white',
          padding: '0.75rem'
        };
      },
      control: (base, state) => ({
        ...base,
        background: '#464646',
        color: 'white',
        borderColor: state.isFocused ? '#5bc55a' : null,
        boxShadow: state.isFocused ? null : null,
        '&:hover': {
          borderColor: state.isFocused ? '#5bc55a' : null
        }
      })
    };
    return (
      <div className="flex-center">
        <div>
            <Container>
              <Row>
                <h1 className="songify-header text-center">Fill in your favorite song information</h1>
              </Row>
              <Row>
                <form onSubmit={this.handleSubmit} className="flex-column padding-2">
                  <label htmlFor="song" className="labels">
                    <h5>Song Name</h5>
                    <input
                      id="song"
                      type="text"
                      name="song"
                      onChange={this.handleChange}
                      placeholder="Enter song name Ex: Mr.Brightside"
                      required></input>
                  </label>
                  <label htmlFor="username" className="labels">
                    <h5>Artist</h5>
                    <input
                      id="artist"
                      type="text"
                      name="artist"
                      onChange={this.handleChange}
                      placeholder="Enter artist name Ex: The Killers"
                      required></input>
                  </label>
                  <label htmlFor="genre" className="labels">
                    <h5>Genre</h5>
                    <Select
                      name="genre"
                      onChange={this.handleChange}
                      styles={customStyle}
                      options={genres.map(t => ({ value: t, label: t, name: 'genre' }))}
                      placeholder="Select genre Ex: rock"
                      required
                    />
                  </label>
                  <label htmlFor="noOfRecommendations" className="labels">
                    <h5>Number of Recommendations:</h5>
                    <input name="noOfRecommendations" type="number" onChange={this.handleChange} step="1" min="1" max="50" placeholder="Enter the number (1-50) of recommendations you would like to see. " required />
                  </label>
                    <div className="flex-center margin-3">
                    <label htmlFor="submit">
                      <button type="submit" className='green-button padding-1' onSubmit={this.handleSubmit}><h6> <i className="bi bi-music-note-beamed white"></i> Songify! </h6></button>
                    </label>
                  </div>
                </form>
              </Row>
            </Container>
        </div>
      </div>
    );

  }
}
