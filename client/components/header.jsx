import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // eslint-disable-next-line
    console.log('logout button is clicked');
    // fetch('/auth/logout', req)
    //   .then(res)
    // fetch(`/api/auth/${action}`, req)
    //   .then(res => res.json())
    //   .then(result => {
    //     if (action === 'sign-up') {
    //       window.location.hash = 'sign-in';
    //     } else if (result.user && result.token) {
    //       this.props.onSignIn(result);
    //     }
    //   });
  }

  render() {
    return (
      <header>
        <h1 className='songify-header'>
          Songify
        </h1>
        <button onClick={this.handleClick} className="no-style">Logout  <i className="bi bi-box-arrow-right white icon"></i></button>

      </header>
    );
  }
}
