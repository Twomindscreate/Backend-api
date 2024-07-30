import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { useMember } from '../../hooks/useMember';

const CreateMember = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const { handleCreateMember } = useMember();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleCreateMember({ name, email });
    } catch (err) {
      setError('Member creation failed');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="member-form">
      <h2>Create Member</h2>
      {error && <Alert color="danger">{error}</Alert>}
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Enter member name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="Enter member email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormGroup>
      <Button type="submit" color="primary">Create Member</Button>
    </Form>
  );
};

export default CreateMember;