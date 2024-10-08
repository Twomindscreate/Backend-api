import { useDispatch, useSelector } from "react-redux";
import {
  createMember,
  fetchMembers,
  updateMember,
  deleteMember,
  fetchUsers,
} from "../../store/member/memberSlice";

const useMemberCRUD = () => {
  const dispatch = useDispatch();
  const { members, loading, error, users } = useSelector(
    (state) => state.member
  );

  // Create a new member
  const handleCreateMember = async (memberData) => {
    try {
      await dispatch(createMember(memberData)).unwrap();
    } catch (err) {
      console.error("Error creating member:", err);
    }
  };

  // Fetch all members
  const handleFetchMembers = async () => {
    try {
      await dispatch(fetchMembers()).unwrap();
    } catch (err) {
      console.error("Error fetching members:", err);
    }
  };

  // Update a member
  const handleUpdateMember = async (id, memberData) => {
    try {
      await dispatch(updateMember({ id, memberData })).unwrap();
    } catch (err) {
      console.error("Error updating member:", err);
    }
  };

  // Delete a member
  const handleDeleteMember = async (id) => {
    try {
      await dispatch(deleteMember(id)).unwrap();
    } catch (err) {
      console.error("Error deleting member:", err);
    }
  };

  // Fetch users
  const handleFetchUsers = async () => {
    try {
      await dispatch(fetchUsers()).unwrap();
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  return {
    members,
    loading,
    error,
    users,
    handleCreateMember,
    handleFetchMembers,
    handleUpdateMember,
    handleDeleteMember,
    handleFetchUsers,
  };
};

export default useMemberCRUD;
