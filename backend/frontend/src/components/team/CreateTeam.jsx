import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { useTeam } from "../../hooks/useTeam";

const CreateTeam = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  // const { handleCreateTeam } = useTeam();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await handleCreateTeam({ name, description });
  //   } catch (err) {
  //     setError('Team creation failed');
  //   }
  // };

  return (
    <Form
      //  onSubmit={handleSubmit}
      className="team-form"
    >
      <h2>Create Team</h2>
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
      <Button type="submit" color="primary">
        Create Team
      </Button>
    </Form>
  );
};

export default CreateTeam;
