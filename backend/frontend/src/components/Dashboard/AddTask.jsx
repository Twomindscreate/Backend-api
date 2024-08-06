
import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import './task.css'; // Import the CSS file
import FormGroup from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faProjectDiagram, faTasks } from '@fortawesome/free-solid-svg-icons';


const AddTask = () => {
  const [showModal, setShowModal] = useState(false);
  
  const handleAddClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="make-center">
      <h1>Task</h1>
      {/* <form action="">
        <label htmlFor="task">Task:</label>
        <input type="text" id="task" name="task" required />
        <input type="submit" value="Add Task" />
      </form> */}

      <input
        type="search"
        placeholder="Search"
        className="search-input"
        aria-label="Search"
      />
      <button className="add-btn" onClick={handleAddClick}>Add Task</button>
      <div className="container mt-5 table-container">
        <table className="table1">
          <thead>
            <tr>
              <th>TaskId</th>
              <th>Title</th>
              <th>Description</th>
              <th>AssignedTo</th>
              <th>Project</th>
              <th>Status</th>
              <th>Action</th>
              {/* <th>completiondate</th> */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>title1</td>
              <td>abcds</td>
              <td>user1</td>
              <td>projectName</td>
              <td className='pending'>pending</td>
              <td><Button className='edit' variant="outline-primary">Edit</Button>  <Button className='del' variant="danger">Delete</Button></td>
            </tr>
            <tr>
            <td>2</td>
              <td>title2</td>
              <td>abcds</td>
              <td>user2</td>
              <td>projectName</td>
              <td className='pending'>pending</td>
              <td><Button className='edit' variant="outline-primary">Edit</Button><Button className='del' variant="danger">Delete</Button></td>
            </tr>
            <tr>
            <td>3</td>
              <td>title3</td>
              <td>abcds</td>
              <td>user3</td>
              <td>projectName</td>
              <td className='completed'>completed</td>
              <td><Button className='edit' variant="outline-primary">Edit</Button> <Button className='del' variant="danger">Delete</Button></td>
            </tr>
          </tbody>
        </table>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title className='task'>Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group controlId="formTitleName" className='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter task title" required />
            </Form.Group>
            <Form.Group controlId="formTeamDescription">
              <Form.Label>Task Description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter team description" required />
            </Form.Group>
            

            <label>AssignedTo</label>
            {/* <DropdownButton
            variant="Secondary" title="Select User"
             >
            <Dropdown.Item eventKey="1">User1</Dropdown.Item>
            <Dropdown.Item eventKey="2">User2</Dropdown.Item>
           
            <Dropdown.Divider /> */}

            <DropdownButton
            variant="Secondary" title="Select User"
             >
            <Dropdown.Item eventKey="1">
                <FontAwesomeIcon icon={faUser} /> User1
              </Dropdown.Item>
              <Dropdown.Item eventKey="2">
                <FontAwesomeIcon icon={faUser} /> User2
              </Dropdown.Item>
              <Dropdown.Divider />
            </DropdownButton>

            
            <label>Project</label>     
            <DropdownButton
            variant="Secondary" title="Select Project"
             >
            <Dropdown.Item eventKey="1">Project1</Dropdown.Item>
            <Dropdown.Item eventKey="2">Project2</Dropdown.Item>
           
            <Dropdown.Divider />
            </DropdownButton>     
            
            <label>Status</label>     
            <DropdownButton
            variant="Secondary" title="Select Status"
             >
            <Dropdown.Item className="" eventKey="1">Pending</Dropdown.Item>
            <Dropdown.Item eventKey="2">completed</Dropdown.Item>
           
            <Dropdown.Divider />
            </DropdownButton>  


            <Button variant="primary" type="submit">
              Add Task
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );

   
};

export default AddTask;
