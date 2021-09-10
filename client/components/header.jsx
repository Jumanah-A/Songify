import React from 'react';


export default class Header extends React.Component
{
  render()
  {
    return(
      <header>
        <h1 className='songify-header'>
          Songify
        </h1>
        <button className="no-style">Logout  <i className="bi bi-box-arrow-right white icon"></i></button>

      </header>
    )
  }
}
