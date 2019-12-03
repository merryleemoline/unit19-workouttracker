import React, { useEffect, useState } from "react";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";

function Detail(props) {
  const [workout, setWorkout] = useState({})
  useEffect(() => {
    API.getWorkout(props.match.params.id)
      .then(res => setWorkout(res.data ))
      .catch(err => console.log(err));
  }, [])

  return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                {workout.title} {workout.date}
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
            <article>
              <h1>Workout Description</h1>
              <p>
                {workout.description}
              </p>
            </article>
          </Col>
        </Row>
      </Container>
    );
  }


export default Detail;
