import React from 'react';
import Home from './pages/home';
import Welcome from './pages/welcome';
import Header from './components/header';
import Container from './components/container';
import cookie from 'cookie';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: null, isAuthenticated: false };

  }

  componentDidMount() {
    const userData = cookie.parse(document.cookie);
    if (userData.userName !== undefined) {
      this.setState({ user: JSON.parse((userData.userName).slice(2)) });
    } else {
      this.setState({ user: null });
    }
  }

  renderPage(user) {
    return <Welcome name={user.displayName}></Welcome>;
  }

  render() {
    return (
    <>
        {this.state.user !== null &&
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
