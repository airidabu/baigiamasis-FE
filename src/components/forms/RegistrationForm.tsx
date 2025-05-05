import React, { useState } from "react";
import {
    TextField,
    Button,
    Grid,
    Typography,
    Box,
    InputAdornment,
    IconButton,
    Paper,
    Alert,
    Snackbar
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const RegistrationForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthDate: ""
    });

    const [errors, setErrors] = useState({
        name: false,
        surname: false,
        email: false,
        password: false,
        confirmPassword: false,
        passwordMatch: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

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

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const validateEmail = (email: string) => {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    };

    const validatePassword = (password: string) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}:'"\\|,.<>/?]).{6,}$/.test(password);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {
            name: formData.name.trim() === "",
            surname: formData.surname.trim() === "",
            email: !validateEmail(formData.email) || formData.email.trim() === "",
            password: !validatePassword(formData.password) || formData.password.trim() === "",
            confirmPassword: formData.confirmPassword.trim() === "",
            passwordMatch: formData.password !== formData.confirmPassword
        };

        setErrors(newErrors);

        if (!Object.values(newErrors).some(error => error)) {
            console.log("Form submitted:", formData);
            try {
                setLoading(true);
                setApiError(null);

                const res = await axios.post(`${API_URL}/users/register`, {
                    name: formData.name,
                    surname: formData.surname,
                    email: formData.email,
                    password: formData.password,
                    ...(formData.birthDate && { birthDate: formData.birthDate })
                });

                console.log("Registration response:", res.data);
                setRegistrationSuccess(true);
                //TODO: Redirect to login page or show success message
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response) {
                        setApiError(error.response.data.message || "Registration failed.");
                    } else {
                        setApiError("Network error. Please try again later.");
                    }
                } else {
                    setApiError("An unexpected error occurred");
                }
                console.error("Registration error:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleCloseSnackbar = () => {
        setApiError(null);
        setRegistrationSuccess(false);
    };

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: "auto", my: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom align="center">
                Registration
            </Typography>
            {apiError && (
                <Alert severity="error" sx={{ mb: 2 }} onClose={handleCloseSnackbar}>
                    {apiError}
                </Alert>
            )}
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            name="name"
                            label="First Name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={errors.name}
                            helperText={errors.name && "First name is required"}
                            margin="normal"
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            name="surname"
                            label="Last Name"
                            value={formData.surname}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={errors.surname}
                            helperText={errors.surname && "Last name is required"}
                            margin="normal"
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
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
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            name="password"
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={errors.password}
                            helperText={errors.password && "Password must be at least 6 characters with uppercase, lowercase, number, and special character"}
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
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            name="confirmPassword"
                            label="Confirm Password"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            fullWidth
                            required
                            error={errors.confirmPassword || errors.passwordMatch}
                            helperText={(errors.confirmPassword && "Confirm password is required") || (errors.passwordMatch && "Passwords don't match")}
                            margin="normal"
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle confirm password visibility"
                                                onClick={handleClickShowConfirmPassword}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <TextField
                            label="Birth Date (optional)"
                            variant="outlined"
                            fullWidth
                            type="date"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                            margin="normal"
                            slotProps={{ inputLabel: { shrink: true } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Register"}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <Snackbar
                open={registrationSuccess}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Registration successful!"
            />
        </Paper>
    );
};

export default RegistrationForm;