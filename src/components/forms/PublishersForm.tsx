import { useState } from "react";
import Publisher from "../../types/Publisher";
import axios from "axios";
import {
    Paper,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
    Snackbar
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const currentYear = new Date().getFullYear();

interface FormErrors {
    name: boolean;
    establishedYear: boolean;
    website: boolean;
    nameError: string;
    yearError: string;
    websiteError: string;
}

type PublisherFormData = Omit<Publisher, "_id" | "createdAt" | "updatedAt" | "__v">;

const PublishersForm: React.FC = () => {
    const [formData, setFormData] = useState<PublisherFormData>({
        name: "",
        location: "",
        establishedYear: undefined,
        website: ""
    });

    const [errors, setErrors] = useState<FormErrors>({
        name: false,
        establishedYear: false,
        website: false,
        nameError: "",
        yearError: "",
        websiteError: ""
    });

    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const { user } = useAuth();
    const isAdmin = user?.role === "admin";

    if (!isAdmin) {
        return (
            <Alert severity="error">You do not have a permission to access this form</Alert>
        )
    }


    const validateUrl = (url: string) => {
        if (!url) return true; // Empty is valid (optional field)
        return /^https?:\/\/[^\s$.?#].[^\s]*$/.test(url);
    };

    const validateYear = (year: number | undefined) => {
        if (!year) return true; // Empty is valid (optional field)
        return year >= 1000 && year <= currentYear;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'establishedYear') {

            setFormData({
                ...formData,
                [name]: value === "" ? undefined : parseInt(value)
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }

        if (name in errors) {
            setErrors(prev => ({
                ...prev,
                [name]: false,
                [`${name}Error`]: ""
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors = {
            name: formData.name.trim() === "",
            establishedYear: !validateYear(formData.establishedYear),
            website: !validateUrl(formData.website || ""),
            nameError: formData.name.trim() === "" ? "Publisher name is required" : "",
            yearError: !validateYear(formData.establishedYear)
                ? `Year must be between 1000 and ${currentYear}`
                : "",
            websiteError: !validateUrl(formData.website || "")
                ? "Please provide a valid URL (e.g., http://example.com)"
                : ""
        };

        setErrors(newErrors);

        if (!newErrors.name && !newErrors.establishedYear && !newErrors.website) {
            setLoading(true);
            setApiError(null);

            try {
                const response = await axios.post(`${API_URL}/publishers`, formData);
                console.log("Publisher created:", response.data);
                setSuccess(true);

                setFormData({
                    name: "",
                    location: "",
                    establishedYear: undefined,
                    website: ""
                });

            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response?.data?.message) {
                        setApiError(error.response.data.message);
                    } else if (error.response?.status === 409) {
                        setApiError("A publisher with this name already exists.");
                    } else {
                        setApiError("An error occurred while creating the publisher.");
                    }
                    console.error("Error creating publisher:", error);
                }
            } finally {
                setLoading(false);
            }
        }
    };

    const handleCloseSnackbar = () => {
        setApiError(null);
        setSuccess(false);
    };

    return (
        <Paper elevation={3} sx={{ p: 4, maxWidth: 500, mx: "auto", my: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom align="center">
                Add New Publisher
            </Typography>

            {apiError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {apiError}
                </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                    label="Publisher Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    required
                    error={errors.name}
                    helperText={errors.nameError}
                />

                <TextField
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                />

                <TextField
                    label="Established Year"
                    name="establishedYear"
                    type="number"
                    value={formData.establishedYear === undefined ? "" : formData.establishedYear}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    error={errors.establishedYear}
                    helperText={errors.yearError}
                />

                <TextField
                    label="Website URL"
                    name="website"
                    value={formData.website === undefined ? "" : formData.website}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    placeholder="https://example.com"
                    error={errors.website}
                    helperText={errors.websiteError}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    disabled={loading}
                >
                    {loading ? "Adding Publisher..." : "Add Publisher"}
                </Button>
            </Box>

            <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message="Publisher created successfully!"
            />
        </Paper>
    );
};

export default PublishersForm;
