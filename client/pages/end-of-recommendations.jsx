import React from 'react';
import { Row, Container } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import { GiPartyPopper } from 'react-icons/gi';

export default function EndOfRecommendations(props) {
  // const handleClick = () =>
  // {
  //   console.log("To the loved songs we go!!");
  // }
  return (
    <>
      <div className='flex-center'>
        <Container>
          <Row>
            <h1 className='text-center'><GiPartyPopper/> Hurray you have reviewed all the recommended songs!</h1>
          </Row>
          <Row>
            <div className='flex-center'>
              <a className='green-button margin-3 padding-1' href='#song-form'><h6> <FaHeart/>  Go to liked songs! </h6></a>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );

}
