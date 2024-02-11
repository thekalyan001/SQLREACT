import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import axios from 'axios';

const Profile = () => {
  const location = useLocation();
  const navigate= useNavigate();
  const { state } = location;
  const [profileData, setProfileData] = useState(null);
  // console.log("state is: ", state);  ✔
  useEffect(() => {
    if (state && state.email && state.password) {
      axios.post('http://localhost:8081/profile', { email: state.email, password: state.password })
        .then(res => {
          // console.log("Profile data:", res.data);
          setProfileData(res.data);
        })
        .catch(err => console.log(err));
    }
  }, [state]);

  const handleEditProfile = () => {
    profileData.email=state.email;
    profileData.password=state.password;
    navigate('/update-profile', { state: profileData });
  };


  return (
    <Box sx={{ maxWidth: '500px', margin: 'auto', mt: 4, px: 2 }}>
      <Typography variant="h4" gutterBottom>Welcome, {profileData?.name || 'User'}!</Typography>
      <Typography variant="body1" gutterBottom>Email, {profileData?.email || 'N/A'}!</Typography>
      <Typography variant="body1" gutterBottom>Age: {profileData?.age || 'N/A'}</Typography>
      <Typography variant="body1" gutterBottom>Date of Birth: {profileData?.dob || 'N/A'}</Typography>
      <Typography variant="body1" gutterBottom>Contact: {profileData?.contact || 'N/A'}</Typography>
      <Typography variant="body1" gutterBottom>School: {profileData?.school || 'N/A'}</Typography>
      <Button onClick={handleEditProfile} variant="contained" color="primary" sx={{ mt: 2 }}>
        Edit Profile
      </Button>
    </Box>
  );
};

export default Profile;
