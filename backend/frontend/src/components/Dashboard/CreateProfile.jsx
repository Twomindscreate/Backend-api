import React from "react";

const CreateProfile = () => {
  return (
    <div className="make-center">
      <h1>Create Profile</h1>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name"
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
        />

        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Enter your phone number"
          required
        />

        <input type="submit" value="Create Profile" />
      </form>
    </div>
  );
};

export default CreateProfile;
