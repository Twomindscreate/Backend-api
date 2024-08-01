import React from "react";
import TButton from "../components/Button";

const Dashboard = () => {
  const clickHandler = () => {
    alert("Hello world");
  };
  return (
    <div className="make-center">
      <h1>Dashboard 123</h1>
      <TButton handleClick={clickHandler} lable="Click Me" classes="test" />
    </div>
  );
};

export default Dashboard;
