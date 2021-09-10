import React from 'react';
import { RiSpotifyFill} from 'react-icons/ri';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';


export default function Home(props) {
  const isActive = useMediaQuery('(min-width:600px)');
  const handleClick = () => {
    window.location.href = "/auth/spotify";

  }
  return (
    <>
    <div className='center'>
      <div>
        <Grid container className='flex-column'>
        <Grid item>
            <h1>Welcome to <span className='songify-header'>Songify</span></h1>
        </Grid>
        <Grid item>
            <h2>Get a fresh set of recommendations based on your favorite song, artist and genre.</h2>
        </Grid>
        <Grid item>
            <h2>Sign in to your Spotify account to get started!</h2>
        </Grid>
          {isActive &&
              <Grid item className='flex-end'>
              <button  onClick={handleClick} className='green-button'>  <h1><RiSpotifyFill className='spotify-icon' />Sign in to Spotify</h1><a href='/auth/spotify'></a></button>
              </Grid> }
          {!isActive &&
              <Grid item className='flex-center'>
              <button onClick={handleClick}className='green-button'>  <h1><RiSpotifyFill className='spotify-icon' href='/auth/spotify'/>Sign in to Spotify</h1></button>
                </Grid>
          }
      </Grid>
      </div>
    </div>
    </>
  );
}
