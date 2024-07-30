import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { useProject } from '../../hooks/useProject';
import { useParams } from 'react-router-dom';

const EditProject = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const { handleFetchProjectDetail, handleUpdateProject, project } = useProject();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        await handleFetchProjectDetail(id);
      } catch (err) {
        setError('Failed to fetch project');
      }
    };
    fetchProject();
  }, [id]);

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
    }
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleUpdateProject(id, { name, description });
    } catch (err) {
      setError('Project update failed');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="project-form">
      <h2>Edit Project</h2>
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
      <Button type="submit" color="primary">Update Project</Button>
    </Form>
  );
};

export default EditProject;