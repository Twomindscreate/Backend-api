import { useDispatch, useSelector } from "react-redux";
import { createMember } from "../../store/member/memberSlice";

const useMenberCRUD = () => {
  const dispatch = useDispatch();
  const memberState = useSelector((state) => state.member);

  // create member
  const handleCreateMember = (memberData) => {
    dispatch(createMember(memberData));
  };

  // fetch member by
  const handleFetchMember = (id) => {
    dispatch(fetchMember(id));
  };

  // update member
  const handleUpdateMember = (id, memberData) => {
    dispatch(updateMember({ id, memberData }));
  };

  // delete member
  const handleDeleteMember = (id) => {
    dispatch(deleteMember(id));
  };

  return {
    ...memberState,
    handleCreateMember,
    handleFetchMember,
    handleUpdateMember,
    handleDeleteMember,
  };
};

export default useMenberCRUD;
