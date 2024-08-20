import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Modal,
  Input,
  Dropdown,
  Table,
  Icon,
  Loader,
  Message,
  Image,
} from "semantic-ui-react";
import useTaskCRUD from "../../hooks/Task/useTaskCRUD";
import useMemberCRUD from "../../hooks/member/useMemberCRUD";

const CreateTaskComponent = () => {
  const {
    tasks,
    loading,
    handleCreateTask,
    handleFetchTasks,
    handleUpdateTask,
    handleDeleteTask,
  } = useTaskCRUD();

  const { members = [], handleFetchMembers } = useMemberCRUD();

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    assigned_to: "",
    project: "",
    status: "",
    completion_date: "",
  });
  const [editingTask, setEditingTask] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await handleFetchTasks();
        await handleFetchMembers();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e, { name, value }) => {
    setTaskForm({ ...taskForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (editingTask) {
        await handleUpdateTask(editingTask.id, taskForm);
      } else {
        await handleCreateTask(taskForm);
      }
      setOpen(false);
      setTaskForm({
        title: "",
        description: "",
        assigned_to: "",
        project: "",
        status: "",
        completion_date: "",
      });
      setEditingTask(null);
      await handleFetchTasks();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await handleDeleteTask(id);
      await handleFetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title
      ? task.title.toLowerCase().includes(searchTerm.toLowerCase())
      : false
  );

  const memberOptions = members.map((member) => ({
    key: member.id,
    text: member.id,
    value: member.id,
  }));

  return (
    <div style={{ padding: "20px" }}>
      {loading && <Loader active inline="centered" />}
      {loading && <Message>Loading...</Message>}

      <Input
        icon="search"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px", width: "50%" }}
      />
      <Button color="green" onClick={() => setOpen(true)}>
        <Icon name="plus" /> Add Task
      </Button>

      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Assigned To</Table.HeaderCell>
            <Table.HeaderCell>Project</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>Completion Date</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <Table.Row key={task.id}>
                <Table.Cell>{task.title}</Table.Cell>
                <Table.Cell>{task.description}</Table.Cell>
                <Table.Cell>
                  {members.find((member) => member.id === task.assigned_to)
                    ?.name || "N/A"}
                </Table.Cell>
                <Table.Cell>{task.project}</Table.Cell>
                <Table.Cell>{task.status}</Table.Cell>
                <Table.Cell>{task.completion_date}</Table.Cell>
                <Table.Cell>
                  <Button
                    color="yellow"
                    onClick={() => {
                      setEditingTask(task);
                      setTaskForm(task);
                      setOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button color="red" onClick={() => handleDelete(task.id)}>
                    Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan="7" textAlign="center">
                No tasks found.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      <Modal open={open} onClose={() => setOpen(false)} size="small">
        <Modal.Header>{editingTask ? "Edit Task" : "Add Task"}</Modal.Header>
        <Modal.Content>
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>Title</label>
              <Input
                name="title"
                value={taskForm.title}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <Input
                name="description"
                value={taskForm.description}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Assigned To</label>
              <Dropdown
                placeholder="Select Member"
                fluid
                search
                selection
                options={memberOptions}
                name="assigned_to"
                value={taskForm.assigned_to}
                onChange={(e, { value }) =>
                  handleChange(e, { name: "assigned_to", value })
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
              <label>Project</label>
              <Input
                name="project"
                value={taskForm.project}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Status</label>
              <Input
                name="status"
                value={taskForm.status}
                onChange={handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Completion Date</label>
              <Input
                name="completion_date"
                type="date"
                value={taskForm.completion_date}
                onChange={handleChange}
              />
            </Form.Field>
            <Button type="submit" color="green" loading={isSubmitting}>
              {editingTask ? "Update Task" : "Create Task"}
            </Button>
            <Button
              type="button"
              color="red"
              onClick={() => {
                setOpen(false);
                setTaskForm({
                  title: "",
                  description: "",
                  assigned_to: "",
                  project: "",
                  status: "",
                  completion_date: "",
                });
                setEditingTask(null);
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

export default CreateTaskComponent;
