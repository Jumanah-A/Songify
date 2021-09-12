import React from 'react';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // eslint-disable-next-line
    console.log('logout button is clicked');
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
