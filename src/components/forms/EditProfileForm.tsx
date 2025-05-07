import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Alert, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useAuth } from '../../contexts/AuthContext';
import { updateUser, UpdateUserData } from '../../api/users';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

interface EditProfileFormProps {
    open: boolean;
    onClose: () => void;
    onSuccess?: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ open, onClose, onSuccess }) => {
    const { user, login } = useAuth();
    const [formData, setFormData] = useState<UpdateUserData>({
        name: '',
        surname: '',
        email: '',
        birthday: null,
        password: '',
    });
    const [birthdayDate, setBirthdayDate] = useState<Date | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                surname: user.surname || '',
                email: user.email || '',
                birthday: user.birthday || null,
                password: '',
            });

            // Set the separate date state for the date picker
            setBirthdayDate(user.birthday ? new Date(user.birthday) : null);
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBirthdayChange = (date: Date | null) => {
        // Only set valid dates or null
        if (date === null || (date instanceof Date && !isNaN(date.getTime()))) {
            setBirthdayDate(date);

            // Format the date as a string for the formData
            if (date) {
                const formattedDate = formatDateForAPI(date);
                setFormData(prev => ({ ...prev, birthday: formattedDate }));
            } else {
                setFormData(prev => ({ ...prev, birthday: null }));
            }
        }
    };

    const formatDateForAPI = (date: Date | null): string | null => {
        if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
            return null;
        }

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            if (!user || !user.id) {
                throw new Error('User information is missing');
            }

            if (!formData.name || !formData.surname || !formData.email) {
                setError('Name, surname and email are required');
                setLoading(false);
                return;
            }

            // Create cleanData with the correct UpdateUserData type
            const cleanData: UpdateUserData = {
                name: formData.name,
                surname: formData.surname,
                email: formData.email,
                birthday: formatDateForAPI(birthdayDate),
                password: formData.password && formData.password.trim() !== '' ? formData.password : '',
            };

            console.log('Sending update data:', JSON.stringify(cleanData));

            const response = await updateUser(user.id, cleanData);
            console.log('Update response:', response);

            if (response.data && response.data.token) {
                const newToken = response.data.token;
                login(newToken);
            } else {
                console.warn('No token received in the response');
            }

            setSuccess(true);

            setTimeout(() => {
                if (onSuccess) onSuccess();
                onClose();
            }, 1500);
        } catch (error) {
            console.error("Profile update error:", error);

            if (error && typeof error === 'object' && 'response' in error) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const apiError = error as any;

                console.error("Complete error object:", apiError);

                console.error("API error details:", {
                    status: apiError.response?.status,
                    statusText: apiError.response?.statusText,
                    data: apiError.response?.data,
                    headers: apiError.response?.headers,
                    config: apiError.config
                });

                const responseError = apiError.response?.data?.message ||
                    'Failed to update profile. The server rejected the request.';
                setError(responseError);
            } else {
                const errorMessage = error instanceof Error
                    ? error.message
                    : 'Failed to update profile. The server rejected the request.';
                setError(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Edit Your Profile</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ mb: 2 }}>Profile updated successfully!</Alert>}

                    <Grid container spacing={2}>
                        <Grid>
                            <TextField
                                name="name"
                                label="First Name"
                                value={formData.name}
                                onChange={handleChange}
                                fullWidth
                                required
                                margin="normal"
                            />
                        </Grid>
                        <Grid>
                            <TextField
                                name="surname"
                                label="Last Name"
                                value={formData.surname}
                                onChange={handleChange}
                                fullWidth
                                required
                                margin="normal"
                            />
                        </Grid>
                        <Grid>
                            <TextField
                                name="email"
                                label="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                fullWidth
                                required
                                margin="normal"
                                type="email"
                            />
                        </Grid>
                        <Grid>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Birthday (Optional)"
                                    value={birthdayDate}
                                    onChange={handleBirthdayChange}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            margin: 'normal',
                                            helperText: "Select your date of birth"
                                        }
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid>
                            <TextField
                                name="password"
                                label="Password (Optional)"
                                value={formData.password || ''}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                                type="password"
                                helperText="Leave empty to keep current password"
                            />
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>Cancel</Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : "Save Changes"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProfileForm;