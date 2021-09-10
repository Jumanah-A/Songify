import React from 'react';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function Welcome(props) {
  const isActive = useMediaQuery('(min-width:600px)');
  return(
    <div className='flex-center'>
      <div>
        <Grid container className='flex-column'>
        <Grid item>
            <h1>Welcome {props.name}!</h1>
        </Grid>
          {isActive &&
              <Grid item className='flex-end '>
            <button className='green-button margin-3 padding-1'><h3><i className="bi bi-music-note-beamed white"></i>  Get song recommendations!</h3></button>
              </Grid> }
          {!isActive &&
              <Grid item className='flex-center '>
              <button className='green-button margin-3 padding-1'><h6> <i className="bi bi-music-note-beamed white"></i>  Get song recommendations! </h6></button>
                </Grid>
          }
      </Grid>
      </div>
    </div>

    // <div className="flex-center">
    //   <div className='welcome'>
    //   <h1>Welcome {props.name}!</h1>
    //     <button className='green-button'><h2><i class="bi bi-music-note-beamed white"></i>  Get song recommendations!</h2></button>
    //   </div>
    // </div>

  )

}
