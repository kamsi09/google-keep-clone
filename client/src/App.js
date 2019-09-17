// /client/App.js
import React, { Component } from 'react';
import axios from 'axios';
import { Container, Button, Form, FormGroup, Input, Card, CardHeader, CardBody, Row, Col } from 'reactstrap';
import Modal from "./components/modal";

class App extends Component {
  // initialize our state
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      data: [],
      id: 0,
      title: null,
      message: null,
      update: null,
      updateMessage: null,
      intervalIsSet: false,
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null

    };

    //this.updateDB = this.updateDB.bind(this);

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  // just a note, here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    fetch('http://localhost:8080/api/getData')
      .then((data) => data.json())
      .then((res) => this.setState({ data: res.data }));
  };

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = (title, message) => {
    let currentIds = this.state.data.map((data) => data.id);
    let idToBeAdded = 0;
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded;
    }

    axios.post('http://localhost:8080/api/putData', {
      id: idToBeAdded,
      message: message,
      title: title
    });
  };

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = (idTodelete) => {
    parseInt(idTodelete);
    let objIdToDelete = null;
    this.state.data.forEach((dat) => {
      if (dat.id === idTodelete) {
        objIdToDelete = dat._id;
      }
    });

    axios.delete('http://localhost:8080/api/deleteData', {
      data: {
        id: objIdToDelete,
      },
    });
  };

  render() {
    const { data } = this.state;
    return (
      <Container fluid className="page-css">
        <Card className="header-css">
          <Form>
            <FormGroup>
              <Input
                onChange={(e) => this.setState({ title: e.target.value })}
                type="Title"
                name="title"
                id="newTitle"
                placeholder="Title"
                className="no-border" />

              <Input
                onChange={(e) => this.setState({ message: e.target.value })}
                type="textarea"
                name="note"
                id="newtitle"
                placeholder="Take a note ..."
                className="no-border" />

            </FormGroup>
            <Button onClick={() => this.putDataToDB(this.state.title, this.state.message)}>
              ADD
            </Button>
          </Form>
        </Card>
        <br />
        <Row>

          {data.length <= 0
            ? 'NO DB ENTRIES YET'
            : data.map((dat) => (
              <Col xs="6" sm="4">
                <Card className="card-size">
                  <CardHeader><Row><Col sm={9}><strong>{dat.title}</strong></Col><Col sm={3}><Modal id={dat.id} title={dat.title} message={dat.message} updateDB={this.updateDB}/></Col></Row></CardHeader>
                  <CardBody>{dat.message}</CardBody>
                  {/* <li style={{ padding: '10px' }} key={data.message}>
                  <span style={{ color: 'gray' }}> id: </span> {dat.id} <br />
                  <span style={{ color: 'gray' }}> data: </span>
                  {dat.message}
                </li> */}
                  <Button color="danger" onClick={() => this.deleteFromDB(dat.id)}>
                    DELETE
                  </Button>
                  
              </Card>
              <br/>
              </Col>
            ))}

        </Row>
      </Container>

    );
  }
}

export default App;