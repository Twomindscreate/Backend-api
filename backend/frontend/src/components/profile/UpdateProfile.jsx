import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import { useProfile } from '../../hooks/useProfile';
import { useParams } from 'react-router-dom';

const EditProfile = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState(null);
  const { handleFetchProfileDetail, handleUpdateProfile, profile } = useProfile();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await handleFetchProfileDetail(id);
      } catch (err) {
        setError('Failed to fetch profile');
      }
    };
    fetchProfile();
  }, [id]);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setBio(profile.bio);
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleUpdateProfile(id, { name, bio });
    } catch (err) {
      setError('Profile update failed');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="profile-form">
      <h2>Edit Profile</h2>
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
      <Button type="submit" color="primary">Update Profile</Button>
    </Form>
  );
};

export default EditProfile;