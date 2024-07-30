import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { useMember } from '../../hooks/useMember';
import { useParams } from 'react-router-dom';

const EditMember = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const { handleFetchMemberDetail, handleUpdateMember, member } = useMember();

  useEffect(() => {
    const fetchMember = async () => {
      try {
        await handleFetchMemberDetail(id);
      } catch (err) {
        setError('Failed to fetch member');
      }
    };
    fetchMember();
  }, [id]);

  useEffect(() => {
    if (member) {
      setName(member.name);
      setEmail(member.email);
    }
  }, [member]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleUpdateMember(id, { name, email });
    } catch (err) {
      setError('Member update failed');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="member-form">
      <h2>Edit Member</h2>
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
      <Button type="submit" color="primary">Update Member</Button>
    </Form>
  );
};

export default EditMember;