import React, { useEffect, useState } from "react";
import useMemberCRUD from "../../hooks/member/useMemberCRUD";
const CreateMember = () => {
  const {
    members,
    loading,
    handleCreateMember,
    handleFetchMember,
    handleUpdateMember,
    handleDeleteMember,
  } = useMemberCRUD();

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [memberForm, setMemberForm] = useState({
    user: "",
    team: "",
    role: "",
    joined_at: "",
  });

  const [editingMember, setEditingMember] = useState(null);

  //Fetch members
  useEffect(() => {
    handleFetchMember();
  }, []);

  const handleChange = (e) => {
    setMemberForm({ ...memberForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      if (editingMember) {
        if (!editingMember.id) {
          console.error("Editing member has no ID");
          return;
        }
        await handleUpdateMember(editingMember.id, memberForm);
      } else {
        await handleCreateMember(memberForm);
      }
      setOpen(false);
      setMemberForm({ user: "", team: "", role: "", joined_at: "" });
      setEditingMember(null);
    } catch (error) {
      console.error("Error Submitting form : ", error);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error("Cannot delete member with undefined ID");
      return;
    }

    try {
      await handleDeleteMember(id);
      handleFetchMember();
    } catch (error) {
      console.error("Error deleting member : ", error);
    }
  };

  const filteredMembers = members.filter((member) =>
    member.user
      ? member.user.toLowerCase().includes(searchTerm.toLowerCase())
      : false
  );

  return <div></div>;
};

export default CreateMember;
