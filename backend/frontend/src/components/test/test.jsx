import React from "react";
import {
  Container,
  Card,
  Header,
  Form,
  Button,
  Input,
} from "semantic-ui-react";
import "./demo.css";

const OtpVerification = () => {
  return (
    <div className="otp-wrapper">
      <Card centered className="otp-card">
        <Header as="h2">OTP Verification</Header>

        <Form>
          <Form.Group className="otp-input-group">
            <Input type="text" maxLength="1" className="otp-input" />
            <Input type="text" maxLength="1" className="otp-input" />
            <Input type="text" maxLength="1" className="otp-input" />
            <Input type="text" maxLength="1" className="otp-input" />
          </Form.Group>
          <Button primary fluid className="verify-button">
            Verify OTP
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default OtpVerification;
