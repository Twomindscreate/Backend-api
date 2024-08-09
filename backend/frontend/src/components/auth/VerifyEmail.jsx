import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const [otp, setOtp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/verify-email/",
        { otp }
      );
      if (response.status === 200) {
        navigate("/login");
        toast.success("Email verified, Please login");
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
    <div>
      {/* veryfy otp */}
      <div className="container">
        <div>
          <h1>Verify Email</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="otp">OTP</label>
              <input
                type="text"
                className="form-control"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {loading ? "Verifying..." : "Verify"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
