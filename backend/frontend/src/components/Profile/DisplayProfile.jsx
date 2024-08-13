import React, { useState, useEffect } from "react";
import {
  Container,
  Form,
  Grid,
  Header,
  Card,
  Button,
  Image,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import "../main.css";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    phone_number: "",
    address: "",
    occupation: "",
    department: "",
    role: "",
    birth_date: "",
    gender: "",
    bio: "",
    photo: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e, { name, value }) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleUpdateProfile = () => {
    setSubmitted(false);
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (fileEvent) => {
        setFormData({ ...formData, photo: fileEvent.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (submitted) {
      const cards = document.querySelectorAll(".display-card");
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add(
            index % 2 === 0 ? "slide-in-left" : "slide-in-right"
          );
        }, index * 500); // Adjusted for faster initial display
      });

      setTimeout(() => {
        cards.forEach((card) => card.classList.add("floating"));
      }, cards.length * 500); // Start floating after all cards are displayed
    }
  }, [submitted]);

  return (
    <Container className="profile-container animated-form">
      <Header as="h2" icon textAlign="center" className="form-header">
        <div className="profile-photo">
          <Image
            src={formData.photo || "https://via.placeholder.com/120"}
            alt="Profile"
            className="profile-image"
          />
        </div>
        Profile Information
      </Header>
      {!submitted ? (
        <Grid centered>
          <Grid.Row>
            <Grid.Column width={12}>
              <Form className="profile-form">
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="Username"
                    name="username"
                    placeholder="Username"
                    icon="user"
                    value={formData.username}
                    onChange={handleChange}
                    className="glowing-input"
                  />
                  <Form.Input
                    fluid
                    label="Phone Number"
                    name="phone_number"
                    placeholder="Phone Number"
                    icon="phone"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="glowing-input"
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="Address"
                    name="address"
                    placeholder="Address"
                    icon="home"
                    value={formData.address}
                    onChange={handleChange}
                    className="glowing-input"
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="Occupation"
                    name="occupation"
                    placeholder="Occupation"
                    icon="briefcase"
                    value={formData.occupation}
                    onChange={handleChange}
                    className="glowing-input"
                  />
                  <Form.Input
                    fluid
                    label="Department"
                    name="department"
                    placeholder="Department"
                    icon="building"
                    value={formData.department}
                    onChange={handleChange}
                    className="glowing-input"
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Input
                    fluid
                    label="Role"
                    name="role"
                    placeholder="Role"
                    icon="user tag"
                    value={formData.role}
                    onChange={handleChange}
                    className="glowing-input"
                  />
                  <Form.Input
                    fluid
                    label="Birth Date"
                    name="birth_date"
                    type="date"
                    icon="calendar"
                    value={formData.birth_date}
                    onChange={handleChange}
                    className="glowing-input"
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <Form.Select
                    fluid
                    label="Gender"
                    name="gender"
                    options={[
                      { key: "m", text: "Male", value: "M" },
                      { key: "f", text: "Female", value: "F" },
                      { key: "o", text: "Other", value: "O" },
                    ]}
                    placeholder="Gender"
                    icon="genderless"
                    value={formData.gender}
                    onChange={handleChange}
                    className="glowing-input"
                  />
                </Form.Group>
                <Form.TextArea
                  label="Bio"
                  name="bio"
                  placeholder="Tell us more about you..."
                  icon="info circle"
                  value={formData.bio}
                  onChange={handleChange}
                  className="glowing-input"
                />
                <Form.Input
                  type="file"
                  label="Profile Photo"
                  name="photo"
                  onChange={handlePhotoChange}
                  className="photo-upload"
                />
                <div className="button-group">
                  <Button
                    color="blue"
                    onClick={handleSubmit}
                    className="submit-button"
                  >
                    Create Profile
                  </Button>
                </div>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      ) : (
        <div className="profile-display">
          <div className="cards-container">
            <Card className="display-card">
              <Card.Content>
                <Card.Header>Username</Card.Header>
                <Card.Description>{formData.username}</Card.Description>
              </Card.Content>
            </Card>
            <Card className="display-card">
              <Card.Content>
                <Card.Header>Phone Number</Card.Header>
                <Card.Description>{formData.phone_number}</Card.Description>
              </Card.Content>
            </Card>
            <Card className="display-card">
              <Card.Content>
                <Card.Header>Address</Card.Header>
                <Card.Description>{formData.address}</Card.Description>
              </Card.Content>
            </Card>
            <Card className="display-card">
              <Card.Content>
                <Card.Header>Occupation</Card.Header>
                <Card.Description>{formData.occupation}</Card.Description>
              </Card.Content>
            </Card>
            <Card className="display-card">
              <Card.Content>
                <Card.Header>Department</Card.Header>
                <Card.Description>{formData.department}</Card.Description>
              </Card.Content>
            </Card>
            <Card className="display-card">
              <Card.Content>
                <Card.Header>Role</Card.Header>
                <Card.Description>{formData.role}</Card.Description>
              </Card.Content>
            </Card>
            <Card className="display-card">
              <Card.Content>
                <Card.Header>Birth Date</Card.Header>
                <Card.Description>{formData.birth_date}</Card.Description>
              </Card.Content>
            </Card>
            <Card className="display-card">
              <Card.Content>
                <Card.Header>Gender</Card.Header>
                <Card.Description>{formData.gender}</Card.Description>
              </Card.Content>
            </Card>
            <Card className="display-card">
              <Card.Content>
                <Card.Header>Bio</Card.Header>
                <Card.Description>{formData.bio}</Card.Description>
              </Card.Content>
            </Card>
          </div>
          <div className="button-group">
            <Button
              color="green"
              onClick={handleUpdateProfile}
              className="update-button1"
            >
              Update Profile
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default ProfileForm;
