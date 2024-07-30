import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { useTask } from '../../hooks/useTask';
import { useParams } from 'react-router-dom';

const EditTask = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');
  const [error, setError] = useState(null);
  const { handleFetchTaskDetail, handleUpdateTask, task } = useTask();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        await handleFetchTaskDetail(id);
      } catch (err) {
        setError('Failed to fetch task');
      }
    };
    fetchTask();
  }, [id]);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleUpdateTask(id, { title, description, status });
    } catch (err) {
      setError('Task update failed');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="task-form">
      <h2>Edit Task</h2>
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
      <Button type="submit" color="primary">Update Task</Button>
    </Form>
  );
};

export default EditTask;