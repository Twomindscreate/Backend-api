import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { useTeam } from '../../hooks/useTeam';
import { useParams } from 'react-router-dom';

const EditTeam = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const { handleFetchTeamDetail, handleUpdateTeam, team } = useTeam();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        await handleFetchTeamDetail(id);
      } catch (err) {
        setError('Failed to fetch team');
      }
    };
    fetchTeam();
  }, [id]);

  useEffect(() => {
    if (team) {
      setName(team.name);
      setDescription(team.description);
    }
  }, [team]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleUpdateTeam(id, { name, description });
    } catch (err) {
      setError('Team update failed');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="team-form">
      <h2>Edit Team</h2>
      {error && <Alert color="danger">{error}</Alert>}
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Enter team name"
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
          placeholder="Enter team description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </FormGroup>
      <Button type="submit" color="primary">Update Team</Button>
    </Form>
  );
};

export default EditTeam;