import React, { useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import { useTeam } from '../../hooks/useTeam';
import { Link } from 'react-router-dom';

const TeamList = () => {
  const { teams, handleFetchTeams, handleDeleteTeam } = useTeam();

  useEffect(() => {
    handleFetchTeams();
  }, []);

  return (
    <div className="team-list">
      <h2>Teams</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team) => (
            <tr key={team.id}>
              <td>{team.name}</td>
              <td>{team.description}</td>
              <td>
                <Link to={/team/${team.id}} className="btn btn-info">
                  Details
                </Link>
                <Button color="danger" onClick={() => handleDeleteTeam(team.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/team/create" className="btn btn-primary">
        Create Team
      </Link>
    </div>
  );
};

export default TeamList;