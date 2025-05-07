import { useState } from "react";
import Publisher from "../../types/Publisher";
import {
    TextField,
    Button,
    Box,
    Alert,
    Grid,
} from "@mui/material";
import { usePublishers } from "../../contexts/PublishersContext";

const currentYear = new Date().getFullYear();

interface FormErrors {
    name: boolean;
    establishedYear: boolean;
    website: boolean;
    nameError: string;
    yearError: string;
    websiteError: string;
}

interface EditPublisherFormProps {
    publisher: Publisher;
    onSuccess: () => void;
    onCancel: () => void;
}

const EditPublisherForm: React.FC<EditPublisherFormProps> = ({ publisher, onSuccess, onCancel }) => {
    const [formData, setFormData] = useState<Partial<Publisher>>({
        name: publisher.name,
        location: publisher.location || "",
        establishedYear: publisher.establishedYear,
        website: publisher.website || ""
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
                await updatePublisherData(publisher._id, formData);
                onSuccess();
            } catch (error) {
                setApiError("An error occurred while updating the publisher.");
                console.error("Error updating publisher:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <Box sx={{ p: 1 }}>
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
            </Box>
        </Box>
    );
};

export default EditPublisherForm;
