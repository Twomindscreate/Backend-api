import React, { useState, useEffect } from "react";
import useProfile from "../hooks/useProfile";

const CreateProfile = () => {
  const { profile, loading, error, handleCreateProfile, handleUpdateProfile } =
    useProfile();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    phone_number: "",
    address: "",
    image: "",
    department: "",
    position: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        gender: profile.gender || "",
        phone_number: profile.phone_number || "",
        address: profile.address || "",
        image: profile.image || "",
        department: profile.department || "",
        position: profile.position || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (profile) {
      await handleUpdateProfile(profile.id, formData);
    } else {
      await handleCreateProfile(formData);
    }
  };

  return (
    <div>
      <h2>{profile ? "Update Profile" : "Create Profile"}</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="First Name"
        />
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          placeholder="Last Name"
        />
        <input
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          placeholder="Gender"
        />
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Phone Number"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
        />
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          placeholder="Position"
        />
        <button type="submit">{profile ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default CreateProfile;
