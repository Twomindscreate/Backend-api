import { useState } from 'react';
import {
  fetchMembers,
  createMember,
  fetchMemberDetail,
  updateMember,
  deleteMember,
} from '../api/memberService';

export const useMember = () => {
  const [members, setMembers] = useState([]);
  const [member, setMember] = useState(null);

  const handleFetchMembers = async () => {
    try {
      const response = await fetchMembers();
      setMembers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateMember = async (data) => {
    try {
      const response = await createMember(data);
      setMembers([...members, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFetchMemberDetail = async (id) => {
    try {
      const response = await fetchMemberDetail(id);
      setMember(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateMember = async (id, data) => {
    try {
      const response = await updateMember(id, data);
      setMember(response.data);
      setMembers(members.map((member) => (member.id === id ? response.data : member)));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      await deleteMember(id);
      setMembers(members.filter((member) => member.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    members,
    member,
    handleFetchMembers,
    handleCreateMember,
    handleFetchMemberDetail,
    handleUpdateMember,
    handleDeleteMember,
  };
};