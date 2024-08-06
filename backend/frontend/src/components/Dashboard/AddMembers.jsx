import React from 'react';
 // Import Button from react-bootstrap
import { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
const AddMembers = () => {
  
    const [showModal, setShowModal] = useState(false);
  
    const handleAddClick = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };

  return (
    <div className="make-center">
      <h1>Members</h1>
      <input
        type="search"
        placeholder="Search Member"
        className="search-input"
        aria-label="Search"
      />
      <button className="addbtn" onClick={handleAddClick}>Add Member</button>
      <div className="container mt-5 table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>User</th>
              <th>Team</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>user1</td>
              <td>team1</td>
              <td>role</td>
              <td>
                <Button className='edit' variant="outline-primary">Edit</Button>
                <Button className='del' variant="danger">Delete</Button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>user1</td>
              <td>team1</td>
              <td>role</td>
              <td>
                <Button className='edit' variant="outline-primary">Edit</Button>
                <Button className='del' variant="danger">Delete</Button>
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>user1</td>
              <td>team1</td>
              <td>role</td>
              <td>
                <Button className='edit' variant="outline-primary">Edit</Button>
                <Button className='del' variant="danger">Delete</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header className='modalHeader' closeButton>
          <Modal.Title className='modalTitle'>Create Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group controlId="formTeamName">
              <Form.Label>User</Form.Label>
              <Form.Control type="text" placeholder="Enter user" required />
            </Form.Group>
            <Form.Group controlId="formTeamName">
              <Form.Label>Team</Form.Label>
              <Form.Control type="text" placeholder="Enter team name" required />
            </Form.Group>
            <Form.Group controlId="formTeamName">
              <Form.Label>Role</Form.Label>
              <Form.Control type="text" placeholder="Enter role" required />
            </Form.Group>
            
            <Button variant="primary" type="submit">
              Add Member
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddMembers;
