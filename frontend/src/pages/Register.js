import React, { useState } from 'react';
import { TextField, Button, Container, Box, Typography } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { register } from '../services/authService';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(username, email, password);
            window.location.href = '/app/forum'; // Redirect after registration
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    height: '50vh', // Full viewport height
                    marginTop: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center', // Center vertically
                    alignItems: 'center', // Center horizontally
                    backgroundColor: '#f0f0f0',
                    padding: 4, // Padding inside the box
                    borderRadius: 2, // Rounded corners
                    boxShadow: 3, // Box shadow for depth
                }}
            >
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" onSubmit={handleRegister} sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                    <span
                        style={{
                            display: "block",
                            fontSize: "15px",
                            textAlign: "center",
                        }}
                    >
                        Don't you have an account? <Link to="/login">Login</Link>
                    </span>


                    {message && (
                        <Typography color="error" variant="body2" align="center">
                            {message}
                        </Typography>
                    )}
                </Box>
            </Box>
        </Container >
    );
};

export default Register;
