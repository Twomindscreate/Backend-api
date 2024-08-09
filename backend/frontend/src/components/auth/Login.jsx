import useLogin from "../../hooks/Authentication/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
  const { handleOnChange, handleOnSubmit, loading, loginData } = useLogin();

  // const { email, password } = useState;

  return (
    <div>
      {/* login form with email and password input fields */}
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="text-center">Login</h1>
            <form onSubmit={handleOnSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleOnChange}
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleOnChange}
                  className="form-control"
                  placeholder="Enter password"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {loading ? "Loading..." : "Login"}
              </button>
              <p className="pass-link">
                <Link to="/forget-password">Forget Password</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
