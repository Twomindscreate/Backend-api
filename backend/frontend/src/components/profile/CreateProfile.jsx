import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { useProfile } from '../../hooks/useProfile';

const CreateProfile = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState(null);
  const { handleCreateProfile } = useProfile();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleCreateProfile({ name, bio });
    } catch (err) {
      setError('Profile creation failed');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="profile-form">
      <h2>Create Profile</h2>
      {error && <Alert color="danger">{error}</Alert>}
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="bio">Bio</Label>
        <Input
          type="textarea"
          name="bio"
          id="bio"
          placeholder="Enter a short bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
        />
      </FormGroup>
      <Button type="submit" color="primary">Create Profile</Button>
    </Form>
  );
};

export default CreateProfile;