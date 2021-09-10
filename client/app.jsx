import React from 'react';
// import Home from './pages/home';
import Welcome from './pages/welcome';
import Header from './components/header';
import Container from './components/container';


export default class App extends React.Component {
  constructor(props)
  {
    super(props)
    this.state = { user: null, isAuthenticated:false,};

  }
  componentDidMount()
  {

  }

  renderPage()
  {

  }
  render() {
    const name ='Jumanah';
    return(
    <>
      <Header>

      </Header>
      <Container>
        <Welcome name={name}>
        </Welcome>
      </Container>
      {/* <Home>
      </Home> */}
    </>);
  }

}
