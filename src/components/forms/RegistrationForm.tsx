import React, { useState } from "react";
import {
    TextField,
    Button,
    Grid,
    Typography,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    InputAdornment,
    IconButton,
    Paper
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const RegistrationForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthYear: "",
        birthMonth: "",
        birthDay: ""
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

    const handleSelectChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name as string]: value as string
        });
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

    const handleSubmit = (e: React.FormEvent) => {
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
            // TODO: Handle form submission - send data to server
        }
    };

    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    const months = [
        { value: "1", label: "January" },
        { value: "2", label: "February" },
        { value: "3", label: "March" },
        { value: "4", label: "April" },
        { value: "5", label: "May" },
        { value: "6", label: "June" },
        { value: "7", label: "July" },
        { value: "8", label: "August" },
        { value: "9", label: "September" },
        { value: "10", label: "October" },
        { value: "11", label: "November" },
        { value: "12", label: "December" }
    ];

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: "auto", my: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom align="center">
                Registration
            </Typography>
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
                        <Typography variant="subtitle2" gutterBottom sx={{ mt: 1 }}>
                            Birthday (optional)
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                        <FormControl fullWidth>
                            <InputLabel id="day-label">Day</InputLabel>
                            <Select
                                labelId="day-label"
                                name="birthDay"
                                value={formData.birthDay}
                                label="Day"
                                onChange={handleSelectChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {days.map((day) => (
                                    <MenuItem key={day} value={day.toString()}>
                                        {day}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                        <FormControl fullWidth>
                            <InputLabel id="month-label">Month</InputLabel>
                            <Select
                                labelId="month-label"
                                name="birthMonth"
                                value={formData.birthMonth}
                                label="Month"
                                onChange={handleSelectChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {months.map((month) => (
                                    <MenuItem key={month.value} value={month.value}>
                                        {month.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 4 }}>
                        <FormControl fullWidth>
                            <InputLabel id="year-label">Year</InputLabel>
                            <Select
                                labelId="year-label"
                                name="birthYear"
                                value={formData.birthYear}
                                label="Year"
                                onChange={handleSelectChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {years.map((year) => (
                                    <MenuItem key={year} value={year.toString()}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid size={{ xs: 12 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Register
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
};

export default RegistrationForm;