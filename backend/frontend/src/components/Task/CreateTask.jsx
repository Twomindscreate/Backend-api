import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Input, Table, Icon } from "semantic-ui-react";
import useTaskCRUD from "../../hooks/Task/useTaskCRUD";

const CreateTaskComponent = () => {
  const {
    tasks,

    handleCreateTask,
    handleFetchTasks,
    handleUpdateTask,
    handleDeleteTask,
  } = useTaskCRUD();

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

  // Fetch tasks only once when the component is mounted
  useEffect(() => {
    handleFetchTasks();
  }, []); // Empty dependency array ensures this only runs once

  const handleChange = (e) => {
    setTaskForm({ ...taskForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editingTask) {
        // Update an existing task
        await handleUpdateTask(editingTask.id, taskForm);
      } else {
        // Create a new task
        await handleCreateTask(taskForm);
      }
      setOpen(false);
      setTaskForm({
        title: "",
        description: "",
        assigned_to: "",
        project: "",

        completion_date: "",
      });
      setEditingTask(null);

      // Refetch tasks after submission
      handleFetchTasks();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await handleDeleteTask(id);
      handleFetchTasks(); // Refetch tasks after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const filteredTasks = tasks.filter((task) =>
    task.title
      ? task.title.toLowerCase().includes(searchTerm.toLowerCase())
      : false
  );

  return (
    <div style={{ padding: "20px" }}>
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
                <Table.Cell>{task.assigned_to}</Table.Cell>
                <Table.Cell>{task.project}</Table.Cell>
                <Table.Cell>{task.status}</Table.Cell>
                <Table.Cell>{task.assigned_date}</Table.Cell>
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
              <Table.Cell colSpan="8" textAlign="center">
                No tasks found.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <Modal open={open} onClose={() => setOpen(false)}>
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
              <Input
                name="assigned_to"
                value={taskForm.assigned_to}
                onChange={handleChange}
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
              <label>Completion Date</label>
              <Input
                name="completion_date"
                type="date"
                value={taskForm.completion_date}
                onChange={handleChange}
              />
            </Form.Field>
            <Button type="submit" color="green">
              {editingTask ? "Update Task" : "Create Task"}
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default CreateTaskComponent;

// import React, { useEffect, useState } from "react";
// import {
//   Button,
//   Form,
//   Modal,
//   Input,
//   Table,
//   Icon,
//   Dropdown,
// } from "semantic-ui-react";
// import useTaskCRUD from "../../hooks/Task/useTaskCRUD";
// import axios from "axios";

// const CreateTaskComponent = () => {
//   const {
//     tasks,
//     loading,
//     handleCreateTask,
//     handleFetchTasks,
//     handleUpdateTask,
//     handleDeleteTask,
//   } = useTaskCRUD();

//   const [open, setOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [taskForm, setTaskForm] = useState({
//     title: "",
//     description: "",
//     assigned_to: [],
//     project: [],
//     status: "",
//     completion_date: "",
//   });
//   const [editingTask, setEditingTask] = useState(null);
//   const [members, setMembers] = useState([]);
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     handleFetchTasks();

//     axios.get('/api/members/')
//       .then(response => {
//         console.log("Members fetched:", response.data);
//         setMembers(response.data);
//       })
//       .catch(error => console.error("Error fetching members:", error));

//     axios.get('/api/projects/')
//       .then(response => {
//         console.log("Projects fetched:", response.data);
//         setProjects(response.data);
//       })
//       .catch(error => console.error("Error fetching projects:", error));
//   }, []);

//   const handleChange = (e, { name, value }) => {
//     setTaskForm({ ...taskForm, [name]: value });
//   };

//   const handleSubmit = async () => {
//     try {
//       if (editingTask) {
//         await handleUpdateTask(editingTask.id, taskForm);
//       } else {
//         await handleCreateTask(taskForm);
//       }
//       setOpen(false);
//       setTaskForm({
//         title: "",
//         description: "",
//         assigned_to: [],
//         project: [],
//         status: "",
//         completion_date: "",
//       });
//       setEditingTask(null);
//       handleFetchTasks();
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await handleDeleteTask(id);
//       handleFetchTasks();
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   const filteredTasks = tasks.filter((task) =>
//     task.title
//       ? task.title.toLowerCase().includes(searchTerm.toLowerCase())
//       : false
//   );

//   return (
//     <div style={{ padding: "20px" }}>
//       <Input
//         icon="search"
//         placeholder="Search tasks..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         style={{ marginBottom: "20px", width: "50%" }}
//       />
//       <Button color="green" onClick={() => setOpen(true)}>
//         <Icon name="plus" /> Add Task
//       </Button>
//       <Table celled>
//         <Table.Header>
//           <Table.Row>
//             <Table.HeaderCell>Title</Table.HeaderCell>
//             <Table.HeaderCell>Description</Table.HeaderCell>
//             <Table.HeaderCell>Assigned To</Table.HeaderCell>
//             <Table.HeaderCell>Project</Table.HeaderCell>
//             <Table.HeaderCell>Status</Table.HeaderCell>
//             <Table.HeaderCell>Completion Date</Table.HeaderCell>
//             <Table.HeaderCell>Action</Table.HeaderCell>
//           </Table.Row>
//         </Table.Header>
//         <Table.Body>
//           {filteredTasks.length > 0 ? (
//             filteredTasks.map((task) => (
//               <Table.Row key={task.id}>
//                 <Table.Cell>{task.title}</Table.Cell>
//                 <Table.Cell>{task.description}</Table.Cell>
//                 <Table.Cell>{task.assigned_to.join(', ')}</Table.Cell>
//                 <Table.Cell>{task.project.join(', ')}</Table.Cell>
//                 <Table.Cell>{task.status}</Table.Cell>
//                 <Table.Cell>{task.completion_date}</Table.Cell>
//                 <Table.Cell>
//                   <Button
//                     color="yellow"
//                     onClick={() => {
//                       setEditingTask(task);
//                       setTaskForm(task);
//                       setOpen(true);
//                     }}
//                   >
//                     Edit
//                   </Button>
//                   <Button color="red" onClick={() => handleDelete(task.id)}>
//                     Delete
//                   </Button>
//                 </Table.Cell>
//               </Table.Row>
//             ))
//           ) : (
//             <Table.Row>
//               <Table.Cell colSpan="7" textAlign="center">
//                 No tasks found.
//               </Table.Cell>
//             </Table.Row>
//           )}
//         </Table.Body>
//       </Table>
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Modal.Header>{editingTask ? "Edit Task" : "Add Task"}</Modal.Header>
//         <Modal.Content>
//           <Form onSubmit={handleSubmit}>
//             <Form.Field>
//               <label>Title</label>
//               <Input
//                 name="title"
//                 value={taskForm.title}
//                 onChange={handleChange}
//               />
//             </Form.Field>
//             <Form.Field>
//               <label>Description</label>
//               <Input
//                 name="description"
//                 value={taskForm.description}
//                 onChange={handleChange}
//               />
//             </Form.Field>
//             <Form.Field>
//               <label>Assigned To</label>
//               <Dropdown
//                 name="assigned_to"
//                 placeholder="Select Members"
//                 fluid
//                 multiple
//                 search
//                 selection
//                 options={members.map(member => ({
//                   key: member.id,
//                   value: member.id,
//                   text: member.name
//                 }))}
//                 value={taskForm.assigned_to}
//                 onChange={(e, { name, value }) => handleChange(e, { name, value: value })}
//               />
//             </Form.Field>
//             <Form.Field>
//               <label>Project</label>
//               <Dropdown
//                 name="project"
//                 placeholder="Select Projects"
//                 fluid
//                 multiple
//                 search
//                 selection
//                 options={projects.map(project => ({
//                   key: project.id,
//                   value: project.id,
//                   text: project.name
//                 }))}
//                 value={taskForm.project}
//                 onChange={(e, { name, value }) => handleChange(e, { name, value: value })}
//               />
//             </Form.Field>
//             <Form.Field>
//               <label>Status</label>
//               <Input
//                 name="status"
//                 value={taskForm.status}
//                 onChange={handleChange}
//               />
//             </Form.Field>
//             <Form.Field>
//               <label>Completion Date</label>
//               <Input
//                 name="completion_date"
//                 type="date"
//                 value={taskForm.completion_date}
//                 onChange={handleChange}
//               />
//             </Form.Field>
//             <Button type="submit" color="green">
//               {editingTask ? "Update Task" : "Create Task"}
//             </Button>
//           </Form>
//         </Modal.Content>
//       </Modal>
//     </div>
//   );
// };

// export default CreateTaskComponent;
