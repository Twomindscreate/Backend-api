import useLogin from "../../hooks/Authentication/useLogin";
import { Link } from "react-router-dom";
import { Button, Form, Header, Icon } from "semantic-ui-react";

const Login = () => {
  const { handleOnChange, handleOnSubmit, loading, loginData } = useLogin();

  return (
    <div className="bg_image">
      <div className="trans-card">
        <Header as="h1">
          <Icon name="lock" />
          Login
        </Header>
        <Form onSubmit={handleOnSubmit}>
          <Form.Field className="input-field">
            <Form.Field>
              <label htmlFor="email" className="email-label">
                <Icon name="mail outline" />
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={loginData.email}
                onChange={handleOnChange}
                placeholder="Enter email"
                required
                className="email-input"
              />
            </Form.Field>

            <label htmlFor="password" className="password-label">
              <Icon name="lock outline" /> Password
            </label>
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleOnChange}
              placeholder="Enter password"
              required
              className="email-input"
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
            {loading ? "Loading..." : "Login"}
            <Icon name="send" />
          </Button>
          <p className="pass-link">
            <Link
              to="/forget-password"
              style={{
                color: "Red ",
                textDecoration: "none",
              }}
            >
              Forget Password
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;
