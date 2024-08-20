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
  Loader,
  Message,
  Image,
} from "semantic-ui-react";
import useMemberCRUD from "../../hooks/member/useMemberCRUD";
import useTeamCRUD from "../../hooks/Team/useTeamCRUD";

const CreateMember = () => {
  const {
    members = [],
    loading,
    users = [],
    handleCreateMember,
    handleFetchMembers,
    handleUpdateMember,
    handleDeleteMember,
    handleFetchUsers,
  } = useMemberCRUD();

  const { teams = [], handleFetchTeams } = useTeamCRUD();

  const [open, setOpen] = useState(false);
  const [searchUser, setSearchUser] = useState(""); // State for user search
  const [memberForm, setMemberForm] = useState({
    user: "",
    team: "",
    role: "",
    joined_at: "",
  });
  const [editingMember, setEditingMember] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await handleFetchMembers();
        await handleFetchTeams();
        await handleFetchUsers();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e, { name, value }) => {
    setMemberForm({ ...memberForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

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
      await handleFetchMembers();
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
      await handleFetchMembers();
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  // Filter members based on the search term for user
  const filteredMembers = members.filter((member) => {
    const user = users.find((u) => u.id === member.user);
    const userName = user ? user.full_name.toLowerCase() : "";
    return userName.includes(searchUser.toLowerCase());
  });

  const teamOptions = teams.map((team) => ({
    key: team.id,
    text: team.name,
    value: team.id,
  }));

  const userOptions = users.map((user) => ({
    key: user.id,
    text: user.full_name,
    value: user.id,
    image: { avatar: true, src: user.profile_image },
  }));

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.full_name : "Unknown";
  };

  return (
    <div style={{ padding: "20px" }}>
      {loading && <Loader active inline="centered" />}
      {loading && <Message>Loading...</Message>}

      <Input
        icon="search"
        placeholder="Search by user..."
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
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
                <Table.Cell>
                  {getUserName(member.user)} {/* Display user's full name */}
                </Table.Cell>
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
              <Dropdown
                placeholder="Select User"
                fluid
                search
                selection
                options={userOptions}
                name="user"
                value={memberForm.user}
                onChange={(e, { value }) =>
                  handleChange(e, { name: "user", value })
                }
                renderLabel={(option) => (
                  <span>
                    {option.image && option.image.src ? (
                      <Image
                        className="ui mini avatar image"
                        src={option.image.src}
                        alt={option.text}
                        style={{ marginRight: "5px" }}
                      />
                    ) : null}
                    {option.text}
                  </span>
                )}
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
                type="date"
              />
            </Form.Field>
            <Button type="submit" color="green" loading={isSubmitting}>
              Submit
            </Button>
            <Button
              type="button"
              color="red"
              onClick={() => {
                setOpen(false);
                setMemberForm({ user: "", team: "", role: "", joined_at: "" });
                setEditingMember(null);
              }}
            >
              Cancel
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default CreateMember;
