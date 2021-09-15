import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FiPlayCircle } from 'react-icons/fi';
export default class SongInfo extends React.Component
{
  constructor(props)
  {
    super(props)
    this.state = {};
  }

  render()
  {
    return (
    <>
    <Container>
      <div>
        <Row xs={1} md={2}>
          <Col className='flex-center'>
          <div>
            <img src='https://i.scdn.co/image/ab67616d00001e02465b92a266969a15f7c34302'></img>
          </div>
          {/* <img src="https://i.scdn.co/image/ab67616d0000b273465b92a266969a15f7c34302"></img> */}

          </Col>
          <Col className='align-center'>
          <Container>
            <div>
              <Row>
                <h3>Name: @ my worst</h3>
              </Row>
              <Row >
                <h3>Artists: blackbear</h3>
              </Row>
              <Row >
                <h3>Album: Misery Lake</h3>
              </Row>
              <Row >
                <h3>Year: 2021</h3>
              </Row>
              <Row>
                <div className='align-center'>
                  <FiPlayCircle className='songify-header play-pause'/><h5 className='songify-header padding-left'>Play song preview</h5>
                </div>

              </Row>
            </div>

          </Container>
          </Col>
        </Row>
        <Row className='padding-2'>
          <Col className='flex-center'><button className='green-button no'><h3>Meh...not feeling it</h3></button></Col>
          <Col className='flex-center'><button className='green-button yes'><h3>Love it!</h3></button></Col>
        </Row>

      </div>

    </Container>

        {/* <img src='https://i.scdn.co/image/ab67616d00001e02465b92a266969a15f7c34302'></img> */}

    </>)
  }
}
