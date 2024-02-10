import React, { useState } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const EditProfile = () => {
  const location = useLocation();
  const history = useNavigate();
  const { state} = location;
  // console.log("profiledata is: ", state);
  const [formData, setFormData] = useState({
    name: state.name || '',
    age: state.age || '',
    email: state.email || '',
    password: state.password || '',
    dob: state.dob || '',
    contact:  state.contact || '',
    school: state.school || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8081/update-profile', {
        ...formData,
      });
      if (res.data === "Profile updated successfully") {
        alert("Profile updated successfully");
        history.push('/profile');
      } else {
        alert("Failed to update profile first");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      console.log("Failed to update profile sec");
    }
  };


  return (
    <Box sx={{ maxWidth: '500px', margin: 'auto', mt: 4, px: 2 }}>
      <Typography variant="h4" gutterBottom>Edit Profile</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Date of Birth"
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          label="Contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="School"
          name="school"
          value={formData.school}
          onChange={handleChange}
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Save
        </Button>
      </form>
    </Box>
  );
};

export default EditProfile;
