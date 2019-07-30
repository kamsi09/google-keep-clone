import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import PropTypes from 'prop-types';

class EditModal extends React.Component {
    propTypes = {
    message: PropTypes.String,
    title: PropTypes.String,
    id: PropTypes.String
    };
    
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      message: null,
      title: null,
      data: [],
      idToDelete: null,
      idToUpdate: null,
      objectToUpdate: null
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <Button onClick={this.toggle}>EDIT</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
              <Input  
              onChange={(e) => this.setState({ title: e.target.value })}
              type="Title" 
              name="title" 
              id="newTitle" 
              placeholder="Title" 
              defaultValue={this.props.title}
              className="no-border"/>
        </ModalHeader>
          <ModalBody>
            <Input 
              onChange={(e) => this.setState({ message: e.target.value })}
              type="textarea" 
              name="note" 
              id="newtitle" 
              placeholder="Take a note ..."
              defaultValue={this.props.message}
              className="no-border"/>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.props.updateDB(this.props.id, this.state.title, this.state.message)}>Update Note</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditModal;