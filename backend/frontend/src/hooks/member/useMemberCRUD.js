import { useDispatch, useSelector } from "react-redux";
import {
  createMember,
  fetchMembers,
  updateMember,
  deleteMember,
} from "../../store/member/memberSlice";

const useMemberCRUD = () => {
  const dispatch = useDispatch();
  const memberState = useSelector((state) => state.member);

  // Create a new member
  const handleCreateMember = (memberData) => {
    dispatch(createMember(memberData));
  };

  // Fetch all members
  const handleFetchMembers = () => {
    dispatch(fetchMembers());
  };

  // Update a member
  const handleUpdateMember = (id, memberData) => {
    dispatch(updateMember({ id, memberData }));
  };

  //delete a member
  const handleDeleteMember = (id) => {
    dispatch(deleteMember(id));
  };

  return {
    ...memberState,
    handleCreateMember,
    handleFetchMembers,
    handleUpdateMember,
    handleDeleteMember,
  };
};

export default useMemberCRUD;
