import { useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Link, useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const Signup = () => {
  const { register, handleSubmit, formState: { errors },} = useForm();
  const navigate= useNavigate();// this hook is for navigation from one to other component
  const onSubmit = (data) => {
    // Add your login logic here using the data object
    console.log('Signup successful', data);
    
    //backend code call function for insert into db
    if(data.name !="" && data.email != "" &&data.password != ""){
      axios.post('http://localhost:8081/signup', data)
      .then(res=>{
        console.log(res)
        //navigate to the login page
        navigate('/');
      })
      .catch(err=>console.log(err));
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        maxWidth: '500px',
        margin: 'auto',
        marginTop:'50px',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        backgroundColor: 'white',
      }}
    >
      <Typography variant="h5" component="div" sx={{ mb: 2 }}>
        Signup Form
      </Typography>
      <TextField
        fullWidth
        label="Name"
        {...register('name', {
          required: 'Name is required',
          minLength: {
            value: 3,
            message: 'Name must be at least 3 characters',
          },
        })}
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
        margin="normal"
      />
        <TextField
          fullWidth
          label="Email"
          {...register('email', { // Update field name to 'email'
            required: 'Email is required', // Update error message accordingly
            minLength: {
              value: 3,
              message: 'Email must be at least 3 characters',
            },
          })}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
          margin="normal"
        />
      <TextField
        fullWidth
        type="password"
        label="Password"
        {...register('password', {
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters',
          },
        })}
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        margin="normal"
        sx={{ mt: 2 }}
      />
      {/* <FormControlLabel
        control={<Checkbox {...register('rememberMe')} color="primary" />}
        label="Remember Me"
        sx={{ mt: 1, textAlign: 'left' }}
      /> */}
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Sign Up
      </Button>
      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Box mt={1}>
        <Link to="/">
          ⬅ Goto Sign In
        </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;