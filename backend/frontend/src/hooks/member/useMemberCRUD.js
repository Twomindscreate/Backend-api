// import { useDispatch, useSelector } from "react-redux";
// import {
//   createMember,
//   fetchMembers,
//   updateMember,
//   deleteMember,
// } from "../../store/member/memberSlice";

// const useMemberCRUD = () => {
//   const dispatch = useDispatch();
//   const memberState = useSelector((state) => state.member);

//   // Create a new member
//   const handleCreateMember = (memberData) => {
//     dispatch(createMember(memberData));
//   };

//   // Fetch all members
//   const handleFetchMembers = () => {
//     dispatch(fetchMembers());
//   };

//   // Update a member
//   const handleUpdateMember = (id, memberData) => {
//     dispatch(updateMember({ id, memberData }));
//   };

//   //delete a member
//   const handleDeleteMember = (id) => {
//     dispatch(deleteMember(id));
//   };

//   return {
//     ...memberState,
//     handleCreateMember,
//     handleFetchMembers,
//     handleUpdateMember,
//     handleDeleteMember,
//   };
// };

// export default useMemberCRUD;

import { useDispatch, useSelector } from "react-redux";
import {
  createMember,
  fetchMembers,
  updateMember,
  deleteMember,
} from "../../store/member/memberSlice";

const useMemberCRUD = () => {
  const dispatch = useDispatch();
  const { members, loading, error } = useSelector((state) => state.member);

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

  return {
    members,
    loading,
    error,
    handleCreateMember,
    handleFetchMembers,
    handleUpdateMember,
    handleDeleteMember,
  };
};

export default useMemberCRUD;
