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
    Snackbar,
    Grid
} from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { usePublishers } from "../../contexts/PublishersContext";

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

interface PublishersFormProps {
    mode: "create" | "edit";
    publisher?: Publisher;
    onSuccess?: () => void;
    onCancel?: () => void;
}

const PublishersForm: React.FC<PublishersFormProps> = ({ mode, publisher, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState<Partial<Publisher>>({
        name: mode === "edit" ? publisher?.name : "",
        location: mode === "edit" ? publisher?.location || "" : "",
        establishedYear: mode === "edit" ? publisher?.establishedYear : undefined,
        website: mode === "edit" ? publisher?.website || "" : ""
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

    const { updatePublisherData } = usePublishers();

    const [success, setSuccess] = useState(false);
    const { user } = useAuth();
    const isAdmin = user?.role === "admin";

    if (!isAdmin) {
        return (
            <Alert severity="error">You do not have permission to access this form</Alert>
        )
    }

    const validateUrl = (url: string) => {
        if (!url) return true;
        return /^https?:\/\/[^\s$.?#].[^\s]*$/.test(url);
    };

    const validateYear = (year: number | undefined) => {
        if (!year) return true;
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
            name: formData.name?.trim() === "",
            establishedYear: !validateYear(formData.establishedYear),
            website: !validateUrl(formData.website || ""),
            nameError: formData.name?.trim() === "" ? "Publisher name is required" : "",
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
                if (mode === "create") {
                    const response = await axios.post(`${API_URL}/publishers`, formData);
                    console.log("Publisher created:", response.data);
                    setSuccess(true);

                    setFormData({
                        name: "",
                        location: "",
                        establishedYear: undefined,
                        website: ""
                    });
                } else if (mode === "edit" && publisher) {
                    await updatePublisherData(publisher._id, formData);
                }

                if (onSuccess) {
                    onSuccess();
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response?.data?.message) {
                        setApiError(error.response.data.message);
                    } else if (error.response?.status === 409) {
                        setApiError("A publisher with this name already exists.");
                    } else {
                        setApiError(`An error occurred while ${mode === "create" ? "creating" : "updating"} the publisher.`);
                    }
                    console.error(`Error ${mode === "create" ? "creating" : "updating"} publisher:`, error);
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
        <Paper elevation={mode === "create" ? 3 : 0} sx={{ p: mode === "create" ? 4 : 1, maxWidth: 500, mx: "auto", my: mode === "create" ? 2 : 0 }}>
            {mode === "create" && (
                <Typography variant="h5" component="h2" gutterBottom align="center">
                    Add New Publisher
                </Typography>
            )}

            {apiError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {apiError}
                </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                    label="Publisher Name"
                    name="name"
                    value={formData.name || ""}
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
                    value={formData.location || ""}
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
                    value={formData.website || ""}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    placeholder="https://example.com"
                    error={errors.website}
                    helperText={errors.websiteError}
                />

                {mode === "create" ? (
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
                ) : (
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid>
                            <Button
                                type="button"
                                variant="outlined"
                                color="secondary"
                                fullWidth
                                onClick={onCancel}
                            >
                                Cancel
                            </Button>
                        </Grid>
                        <Grid>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={loading}
                            >
                                {loading ? "Updating..." : "Update Publisher"}
                            </Button>
                        </Grid>
                    </Grid>
                )}
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