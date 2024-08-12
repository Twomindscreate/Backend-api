import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Form, Button, Icon, Header, Card } from "semantic-ui-react";

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
    <div className="bg_image">
      <Card centered className="trans-card">
        <Header as="h2">
          <Icon name="lock" />
          Forget Password
        </Header>
        <Form onSubmit={handleSubmit} className="forget-password-form">
          <Form.Field>
            <label htmlFor="email" className="email-label">
              <Icon name="mail outline" />
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </Form.Field>
          <Button
            type="submit"
            primary
            fluid
            icon
            labelPosition="right"
            loading={loading}
            className="verify-button"
          >
            {loading ? "Sending..." : "Send"}
            <Icon name="send" />
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ForgetPassword;
