import React, { useState, useEffect } from "react";
import { Card, Header, Button, Form, Message, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../test/test.css"; // Import your custom CSS

const OTPVerification = () => {
  const [otp, setOtp] = useState(["", "", "", ""]); // Array to hold OTP digits
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input
      if (index < 3) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index] === "") {
        if (index > 0) {
          document.getElementById(`otp-${index - 1}`).focus();
        }
      } else {
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }

    if (e.key === "ArrowRight" && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      console.log("Final OTP:", otp.join(""));
    }
  }, [otp]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join(""); // Convert OTP array to string
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/verify-email/",
        { otp: finalOtp }
      );
      if (response.status === 200) {
        navigate("/login");
        toast.success("Email verified, Please login");
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data);
        toast.error(err.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg_image">
      <Card centered className="trans-card">
        <Header as="h1">
          <Icon name="key" />
          OTP Verification
        </Header>
        <Form onSubmit={handleSubmit} error={!!error}>
          <div className="otp-input-wrapper">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                id={`otp-${index}`}
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="otp-input"
                autoFocus={index === 0}
              />
            ))}
          </div>
          {error && (
            <Message error>
              <Message.Header>Verification Failed</Message.Header>
              <p>{error.message}</p>
            </Message>
          )}
          <Button
            primary
            fluid
            className="verify-button"
            loading={loading}
            disabled={loading}
          >
            Verify OTP
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default OTPVerification;
