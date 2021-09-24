import React from 'react';

export default class ErrorMessage extends React.Component {
  render() {
    return (
      <div className='flex-column'>
        <div className='flex-center'>
          <h1 className='label'>Sorry an error occurred while processing your request</h1>
        </div>
        <div className='flex-center'>
          <a className='green-button margin-2 padding-1' href='/'><h6> Return to homepage </h6></a>
        </div>
      </div>
    );
  }
}
