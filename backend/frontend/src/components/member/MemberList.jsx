import React, { useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import { useMember } from '../../hooks/useMember';
import { Link } from 'react-router-dom';

const MemberList = () => {
  const { members, handleFetchMembers, handleDeleteMember } = useMember();

  useEffect(() => {
    handleFetchMembers();
  }, []);

  return (
    <div className="member-list">
      <h2>Members</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>
                <Link to={/member/${member.id}} className="btn btn-info">
                  Details
                </Link>
                <Button color="danger" onClick={() => handleDeleteMember(member.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Link to="/member/create" className="btn btn-primary">
        Create Member
      </Link>
    </div>
  );
};

export default MemberList;