import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/password-reset/",
        { email }
      );
      if (response.status === 200) {
        toast.success("Email sent, Please check your email");
        setLoading(false);
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data);
        toast.error(err.response.data.message);
        setLoading(false);
      }
    }
  };

  return (
    <div className="container">
      <div>
        <h1>Forget Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
