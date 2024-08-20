import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Modal,
  Input,
  Dropdown,
  Table,
  Header,
  Icon,
} from "semantic-ui-react";
import useMemberCRUD from "../../hooks/member/useMemberCRUD";
import useTeamCRUD from "../../hooks/Team/useTeamCRUD";

const CreateMember = () => {
  const {
    members,
    loading,
    handleCreateMember,
    handleFetchMembers,
    handleUpdateMember,
    handleDeleteMember,
  } = useMemberCRUD();

  const { teams, handleFetchTeams } = useTeamCRUD(); // Fetch teams

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [memberForm, setMemberForm] = useState({
    user: "",
    team: "", // Team ID will be stored here
    role: "",
    joined_at: "",
  });
  const [editingMember, setEditingMember] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch members and teams only once when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      try {
        await handleFetchMembers();
        await handleFetchTeams();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // Empty dependency array ensures this effect runs only once after the initial render
  }, []);

  const handleChange = (e, { name, value }) => {
    setMemberForm({ ...memberForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    if (isSubmitting) return; // Prevent duplicate submissions

    setIsSubmitting(true);
    try {
      if (editingMember) {
        await handleUpdateMember(editingMember.id, memberForm);
      } else {
        await handleCreateMember(memberForm);
      }
      setOpen(false);
      setMemberForm({ user: "", team: "", role: "", joined_at: "" });
      setEditingMember(null);
      await handleFetchMembers(); // Refetch members after submit
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error("Cannot delete member with undefined ID");
      return;
    }
    try {
      await handleDeleteMember(id);
      await handleFetchMembers(); // Refetch members after deletion
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  // Filter members based on search term
  const filteredMembers = members.filter((member) => {
    // Check if member.user is a string before calling toLowerCase
    const userName =
      typeof member.user === "string" ? member.user.toLowerCase() : "";
    return userName.includes(searchTerm.toLowerCase());
  });

  // Prepare teams for dropdown
  const teamOptions = teams.map((team) => ({
    key: team.id,
    text: team.name,
    value: team.id,
  }));

  return (
    <div style={{ padding: "20px" }}>
      <Input
        icon="search"
        placeholder="Search members..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", width: "50%" }}
      />
      <Button color="green" onClick={() => setOpen(true)}>
        <Icon name="plus" /> Add Member
      </Button>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>User</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
            <Table.HeaderCell>Joined At</Table.HeaderCell>
            <Table.HeaderCell>Team</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <Table.Row key={member.id}>
                <Table.Cell>{member.user}</Table.Cell>
                <Table.Cell>{member.role}</Table.Cell>
                <Table.Cell>{member.joined_at}</Table.Cell>
                <Table.Cell>
                  {teams.find((team) => team.id === member.team)?.name || "N/A"}
                </Table.Cell>
                <Table.Cell>
                  <Button
                    color="blue"
                    onClick={() => {
                      setEditingMember(member);
                      setMemberForm({
                        user: member.user,
                        team: member.team,
                        role: member.role,
                        joined_at: member.joined_at,
                      });
                      setOpen(true);
                    }}
                  >
                    Update
                  </Button>
                  <Button color="red" onClick={() => handleDelete(member.id)}>
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan="5">
                <Header as="h1" textAlign="center">
                  No Member Data Found
                </Header>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      <Modal open={open} onClose={() => setOpen(false)} size="small">
        <Modal.Header>
          {editingMember ? "Update Member" : "Add Member"}
        </Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>User</label>
              <Input
                name="user"
                value={memberForm.user}
                onChange={handleChange}
                placeholder="Enter user name"
              />
            </Form.Field>
            <Form.Field>
              <label>Team</label>
              <Dropdown
                placeholder="Select Team"
                fluid
                selection
                options={teamOptions}
                name="team"
                value={memberForm.team}
                onChange={(e, { value }) =>
                  handleChange(e, { name: "team", value })
                }
              />
            </Form.Field>
            <Form.Field>
              <label>Role</label>
              <Input
                name="role"
                value={memberForm.role}
                onChange={handleChange}
                placeholder="Enter role"
              />
            </Form.Field>
            <Form.Field>
              <label>Joined At</label>
              <Input
                name="joined_at"
                value={memberForm.joined_at}
                onChange={handleChange}
                placeholder="Enter join date"
              />
            </Form.Field>
            <Button
              type="submit"
              color="green"
              loading={loading || isSubmitting}
            >
              {editingMember ? "Update Member" : "Create Member"}
            </Button>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default CreateMember;
