import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Image, Modal } from 'react-bootstrap'; 
import { getProfile, updateProfile, uploadProfileImage } from '../services/auth'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    user_id: '',
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    dob: '',
    bio: '',
    image: '', 
    state: '',
    created_at: '',
    updated_at: ''
  });
  const [notification, setNotification] = useState({ open: false, message: '', severity: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfileData(data);
      } catch (error) {
        setNotification({ open: true, message: 'Failed to fetch profile', severity: 'error' });
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (imageFile) {
        await uploadProfileImage(profileData.user_id, imageFile);
        setProfileData({ ...profileData, image: newImage });
      }
      const updatedData = await updateProfile(profileData.user_id, profileData);
      setProfileData(updatedData);
      setNotification({ open: true, message: 'Profile updated successfully', severity: 'success' });
      setIsEditing(false);
    } catch (error) {
      setNotification({ open: true, message: error.message, severity: 'error' });
    }
  };

  return (
    <div>
      <header>
        <h1>Profile</h1>
      </header>
      <main>
        <Container>
          <h2>Profile</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formImage">
              <Form.Label>Profile Image</Form.Label>
              <div className="d-flex align-items-center">
                <Image
                  src={newImage || profileData.image || "https://via.placeholder.com/100"}
                  roundedCircle
                  style={{ width: '100px', height: '100px' }}
                  onClick={() => setIsModalOpen(true)}
                />
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={!isEditing}
                  className="ml-3"
                />
              </div>
            </Form.Group>
            {/* Campos de perfil */}
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={profileData.username || ''}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="first_name"
                value={profileData.first_name || ''}
                readOnly={!isEditing}
                onChange={handleChange}
              />
            </Form.Group>
            {/* Más campos aquí */}
            <Button type="submit" variant="primary" disabled={!isEditing}>Update Profile</Button>
            <Button type="button" variant="secondary" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
            {notification.open && (
              <Alert variant={notification.severity === 'success' ? 'success' : 'danger'}>
                {notification.message}
              </Alert>
            )}
          </Form>
        </Container>
        <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Preview Image</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Image src={newImage || profileData.image || "https://via.placeholder.com/100"} fluid />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </main>
    </div>
  );
};

export default Profile;




