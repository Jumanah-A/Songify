import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    fetch('/auth/logout')
      .then(res => {
        window.location.href = '/auth/spotify';
      })
      .catch(err => console.error(err));
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
