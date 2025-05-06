import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Box,
    InputAdornment,
    IconButton,
    Paper,
    Alert,
    Snackbar
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [loginSuccess, setLoginSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name in errors) {
            setErrors({
                ...errors,
                [name]: false
            });
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const validateEmail = (email: string) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {
            email: !validateEmail(formData.email) || formData.email.trim() === "",
            password: formData.password.trim() === ""
        };

        setErrors(newErrors);

        if (!Object.values(newErrors).some(error => error)) {
            try {
                setLoading(true);
                setApiError(null);

                const res = await axios.post(`${API_URL}/users/login`, {
                    email: formData.email,
                    password: formData.password
                });

                console.log("Login response:", res.data);

                if (res.data.token) {
                    localStorage.setItem("token", res.data.token);
                    login(res.data.token);
                    setLoginSuccess(true);
                }
                setLoginSuccess(true);

                setTimeout(() => {
                    navigate("/");
                }, 500);

            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        setApiError(error.response.data.message || 'Login failed. Please check your credentials.');
                    } else {
                        setApiError('Network error. Please try again later.');
                    }
                } else {
                    setApiError('An unexpected error occurred');
                }
                console.error("Login error:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleCloseSnackbar = () => {
        setApiError(null);
        setLoginSuccess(false);
    };

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: "auto", my: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom align="center">
                Login
            </Typography>
            {apiError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {apiError}
                </Alert>
            )
            }
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                    name="email"
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={errors.email}
                    helperText={errors.email && "Valid email is required"}
                    margin="normal"
                />
                <TextField
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    fullWidth
                    required
                    error={errors.password}
                    helperText={errors.password && "Password is required"}
                    margin="normal"
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </Button>
            </Box>
            <Snackbar
                open={loginSuccess}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Login successful!"
            />
        </Paper >
    );
}

export default LoginForm;