// import React from "react";
// import './team.css'
// import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
// const AddTeams = () => {
//   return (
//     <div className="make-center">
//       <h1>Teams</h1>
//       {/* <form action="">
//         <label htmlFor="teamName">Team Name:</label>
//         <input type="text" id="teamName" name="teamName" required />
//         <label htmlFor="teamDescription">Team Description:</label>
//         <textarea id="teamDescription" name="teamDescription" required />
//         <button type="submit">Add Team</button>
//       </form> */}
//       
  
//     </div>
//   );
// };

// export default AddTeams;

import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import './team.css'; // Import the CSS file
import FormGroup from 'react-bootstrap';

  const Team = () => {
    const [showModal, setShowModal] = useState(false);
  
    const handleAddClick = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  return (
    <div className="make-center">
      <h1>Teams</h1>
      <input
        type="search"
        placeholder="Search"
        className="search-input"
        aria-label="Search"
      />
      <button className="addbtn" onClick={handleAddClick}>Add Team</button>
      <div className="container mt-5 table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Team Name</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Team1</td>
              <td>abcds</td>
              <td><Button className='edit' variant="outline-primary">Edit</Button>  <Button className='del' variant="danger">Delete</Button></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Team2</td>
              <td>njcdsjkf</td>
              <td><Button className='edit' variant="outline-primary">Edit</Button><Button className='del' variant="danger">Delete</Button></td>
            </tr>
            <tr>
              <td>3</td>
              <td>Team3</td>
              <td>bhskhf</td>
              <td><Button className='edit' variant="outline-primary">Edit</Button> <Button className='del' variant="danger">Delete</Button></td>
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
              <Form.Label>Team Name</Form.Label>
              <Form.Control type="text" placeholder="Enter team name" required />
            </Form.Group>
            <Form.Group controlId="formTeamDescription">
              <Form.Label>Team Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter team description" required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Team
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Team;


  
   
