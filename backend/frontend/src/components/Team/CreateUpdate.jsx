import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Modal,
  Input,
  Table,
  Header,
  Icon,
} from "semantic-ui-react";
import useTeamCRUD from "../../hooks/Team/useTeamCRUD";

const TeamComponent = () => {
  const {
    teams,
    loading,
    handleCreateTeam,
    handleFetchTeams,
    handleUpdateTeam,
    handleDeleteTeam,
  } = useTeamCRUD();

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [teamForm, setTeamForm] = useState({ name: "", description: "" });
  const [editingTeam, setEditingTeam] = useState(null);

  // Fetch teams only once when the component is mounted
  useEffect(() => {
    handleFetchTeams();
  }, []); // Empty dependency array ensures this only runs once

  const handleChange = (e) => {
    setTeamForm({ ...teamForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editingTeam) {
        // Check if the id is valid before updating
        if (!editingTeam.id) {
          console.error("Editing team has no ID");
          return;
        }
        await handleUpdateTeam(editingTeam.id, teamForm);
      } else {
        await handleCreateTeam(teamForm);
      }
      setOpen(false);
      setTeamForm({ name: "", description: "" });
      setEditingTeam(null);

      // Refetch teams or update the state with the new team
      handleFetchTeams();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error("Cannot delete team with undefined ID");
      return;
    }
    try {
      await handleDeleteTeam(id);
      handleFetchTeams(); // Refetch teams after deletion
    } catch (error) {
      console.error("Error deleting team:", error);
    }
  };

  const filteredTeams = teams.filter((team) =>
    team.name
      ? team.name.toLowerCase().includes(searchTerm.toLowerCase())
      : false
  );

  return (
    <div style={{ padding: "20px" }}>
      <Input
        icon="search"
        placeholder="Search teams..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", width: "50%" }}
      />
      <Button color="green" onClick={() => setOpen(true)}>
        <Icon name="plus" /> Add Team
      </Button>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredTeams.length > 0 ? (
            filteredTeams.map((team) => (
              <Table.Row key={team.id}>
                <Table.Cell>{team.name}</Table.Cell>
                <Table.Cell>{team.description}</Table.Cell>
                <Table.Cell>
                  <Button
                    color="blue"
                    onClick={() => {
                      setEditingTeam(team);
                      setTeamForm({
                        name: team.name,
                        description: team.description,
                      });
                      setOpen(true);
                    }}
                  >
                    Update
                  </Button>
                  <Button color="red" onClick={() => handleDelete(team.id)}>
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan="3">
                <Header as="h1" textAlign="center">
                  No Team Data Found
                </Header>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      <Modal open={open} onClose={() => setOpen(false)} size="small">
        <Modal.Header>{editingTeam ? "Update Team" : "Add Team"}</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Name</label>
              <Input
                name="name"
                value={teamForm.name}
                onChange={handleChange}
                placeholder="Enter team name"
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <Input
                name="description"
                value={teamForm.description}
                onChange={handleChange}
                placeholder="Enter team description"
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button color="green" onClick={handleSubmit} loading={loading}>
            {editingTeam ? "Update" : "Add"}
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default TeamComponent;
