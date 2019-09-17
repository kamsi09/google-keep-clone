import React from 'react';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import CreateRoundedIcon from '@material-ui/icons/CreateRounded';


class EditModal extends React.Component {
    propTypes = {
    message: PropTypes.String,
    title: PropTypes.String,
    id: PropTypes.String,
    data: PropTypes.any
    };
    
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      message: null,
      title: null,
      updateTitle: this.props.title,
      updateMessage: this.props.message,
      data: [],
      idToDelete: null,
      idToUpdate: this.props.id,
      objectToUpdate: null
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

    updateDB = (idToUpdate, updateTitle, updateMessage) => {

    axios.put('http://localhost:8080/api/putData', {
      id: parseInt(idToUpdate),
        title: updateTitle, 
        message: updateMessage
      
    });
  };

  render() {
    return (
      <div>
        <Button onClick={this.toggle}><CreateRoundedIcon/></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
              <Input  
              onChange={(e) => this.setState({ updateTitle: e.target.value })}
              type="Title" 
              name="title" 
              id="newTitle" 
              placeholder="Title" 
              defaultValue={this.props.title}
              className="no-border"/>
        </ModalHeader>
          <ModalBody>
            <Input 
              onChange={(e) => this.setState({ updateMessage: e.target.value })}
              type="textarea" 
              name="note" 
              id="newtitle" 
              placeholder="Take a note ..."
              defaultValue={this.props.message}
              className="no-border"/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.updateDB(this.props.id, this.state.updateTitle, this.state.updateMessage)}>Update Note</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditModal;