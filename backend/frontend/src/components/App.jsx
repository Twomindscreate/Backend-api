import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { AuthProvider } from './contexts/AuthContext';
import { ProjectProvider } from './contexts/ProjectContext';
import { TaskProvider } from './contexts/TaskContext';
import Header from './components/Header';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import ProjectList from './components/project/ProjectList';
import CreateProject from './components/project/CreateProject';
import EditProject from './components/project/EditProject';
import TaskList from './components/task/TaskList';
import CreateTask from './components/task/CreateTask';
import EditTask from './components/task/EditTask';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ProjectProvider>
          <TaskProvider>
            <Header />
            <Container>
              <Switch>
                <Route path="/" exact component={ProjectList} />
                <Route path="/project/create" component={CreateProject} />
                <Route path="/project/:id/edit" component={EditProject} />
                <Route path="/task" exact component={TaskList} />
                <Route path="/task/create" component={CreateTask} />
                <Route path="/task/:id/edit" component={EditTask} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/logout" component={Logout} />
              </Switch>
            </Container>
          </TaskProvider>
        </ProjectProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;