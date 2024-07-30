import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { useProject } from '../../hooks/useProject';

const CreateProject = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const { handleCreateProject } = useProject();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleCreateProject({ name, description });
    } catch (err) {
      setError('Project creation failed');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="project-form">
      <h2>Create Project</h2>
      {error && <Alert color="danger">{error}</Alert>}
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Enter project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input
          type="textarea"
          name="description"
          id="description"
          placeholder="Enter project description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </FormGroup>
      <Button type="submit" color="primary">Create Project</Button>
    </Form>
  );
};

export default CreateProject;