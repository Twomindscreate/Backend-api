import React from "react";
import { Button } from "reactstrap";
import { useAuth } from "../../hooks/useAuth";
const Logout = () => {
  const { handleLogout } = useAuth();

  return (
    <Button color="danger" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
