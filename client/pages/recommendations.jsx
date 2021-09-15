import React from 'react';
import SongInfo from '../components/song-info';
export default class Recommendations extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state ={};
  }
  render()
  {
    return (
    <>
    <div className='padding-1'>
      <h1 className='songify-header'>Recommendations</h1>
      <SongInfo></SongInfo>
    </div>

    </>);

  }
}
