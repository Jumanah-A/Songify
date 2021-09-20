import React from 'react';
import Home from './pages/home';
import Welcome from './pages/welcome';
import Recommendations from './pages/recommendations';
import EndOfRecommendations from './pages/end-of-recommendations';
import LikedSongs from './pages/liked-songs';
import Playlist from './pages/playlist';
import Header from './components/header';
import Container from './components/container';
import SongForm from './pages/song-form';
import cookie from 'cookie';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, isAuthenticated: false, route: parseRoute(window.location.hash), likes: [] };
    this.handleLikes = this.handleLikes.bind(this);

  }

  componentDidMount() {
    window.addEventListener('hashchange',
      event => {
        this.setState({ route: parseRoute(window.location.hash) });
      });
    const userData = cookie.parse(document.cookie);
    if (userData.userName !== undefined) {
      this.setState({ user: JSON.parse((userData.userName).slice(2)) });
    } else {
      this.setState({ user: null });
    }
  }

  handleLikes(likes) {
    this.setState({ likes: likes });
  }

  renderPage(user) {
    const { route } = this.state;
    if (route.path === 'song-form') {
      return <SongForm></SongForm>;
    } else if (route.path === 'recommendations') {
      return <Recommendations params={this.state.route.params} likes={this.state.likes} handleLikes={this.handleLikes}></Recommendations>;
    } else if (route.path === '') {
      return <Welcome name={user.displayName}></Welcome>;
    } else if (route.path === 'endOfRecommendations') {
      return <EndOfRecommendations></EndOfRecommendations>;
    } else if (route.path === 'liked-songs') {
      return <LikedSongs likes={this.state.likes}></LikedSongs>;
    } else if (route.path === 'songify-playlist') {
      return <Playlist likes={this.state.likes}></Playlist>;
    }
  }

  render() {
    return (
    <>
        {this.state.user &&
      <>
        <Header>
        </Header>
        <Container>
            {this.renderPage(this.state.user)}
        </Container>
      </>
      }
        {this.state.user === null &&
        <Home>
        </Home>
      }
    </>);
  }

}
