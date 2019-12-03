import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

function Workouts() {
  const [Workouts, setWorkouts] = useState([])
  const [formObject, setFormObject] = useState({})

  useEffect(() => {
    loadWorkouts()
  }, [])

  function loadWorkouts() {
    API.getWorkouts()
      .then(res => 
        setWorkouts(res.data)
      )
      .catch(err => console.log(err));
  };

  function deleteWorkout(id) {
    API.deleteWorkout(id)
      .then(res => loadWorkouts())
      .catch(err => console.log(err));
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.description) {
      API.saveWorkout({
        title: formObject.title,
        time: formObject.time,
        desciption: formObject.desciption
      })
        .then(res => loadWorkouts())
        .catch(err => console.log(err));
    }
  };

    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Log a Workout</h1>
            </Jumbotron>
            <form>
              <Input
                onChange={handleInputChange}
                name="title"
                placeholder="Title of your workout"
              />
              <Input
                onChange={handleInputChange}
                name="time"
                placeholder="Time interval (in minutes)"
              />
              <TextArea
                onChange={handleInputChange}
                name="description"
                placeholder="Desciption of exercises..."
              />
              <FormBtn
                disabled={!(formObject.time && formObject.title)}
                onClick={handleFormSubmit}
              >
                Submit Workout
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Previously Logged Workouts</h1>
            </Jumbotron>
            {Workouts.length ? (
              <List>
                {Workouts.map(workout => (
                  <ListItem key={workout._id}>
                    <Link to={"/Workouts/" + workout._id}>
                      <strong>
                        {workout.title} 
                        {workout.time}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => deleteWorkout(workout._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Workouts to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }


export default Workouts;
