import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { useTask } from '../../hooks/useTask';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [error, setError] = useState(null);
  const { handleCreateTask } = useTask();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleCreateTask({ title, description, status });
    } catch (err) {
      setError('Task creation failed');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="task-form">
      <h2>Create Task</h2>
      {error && <Alert color="danger">{error}</Alert>}
      <FormGroup>
        <Label for="title">Title</Label>
        <Input
          type="text"
          name="title"
          id="title"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input
          type="textarea"
          name="description"
          id="description"
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="status">Status</Label>
        <Input
          type="select"
          name="status"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </Input>
      </FormGroup>
      <Button type="submit" color="primary">Create Task</Button>
    </Form>
  );
};

export default CreateTask;