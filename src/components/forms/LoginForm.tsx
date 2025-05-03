import React, { useState } from 'react';
import {
    TextField,
    Button,
    Typography,
    Box,
    InputAdornment,
    IconButton,
    Paper
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({
        email: false,
        password: false,
    });

    const [showPassword, setShowPassword] = useState(false);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {
            email: !validateEmail(formData.email) || formData.email.trim() === "",
            password: formData.password.trim() === ""
        };

        setErrors(newErrors);

        if (!Object.values(newErrors).some(error => error)) {
            console.log("Login form submitted:", formData);
            // TODO: Handle login submission - send data to server
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: "auto", my: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom align="center">
                Login
            </Typography>
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
                >
                    Login
                </Button>
            </Box>
        </Paper>
    );
}

export default LoginForm;