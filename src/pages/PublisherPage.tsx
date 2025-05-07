import { useState, useEffect } from "react";
import {
    Container, Typography, Paper, Button, Box,
    Grid, Divider, Dialog, DialogTitle,
    DialogContent, DialogActions, CircularProgress,
    Alert, Snackbar
} from '@mui/material';
import { Edit, Delete } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router";
import { usePublishers } from "../contexts/PublishersContext";
import { useAuth } from "../contexts/AuthContext";
import EditPublisherForm from "../components/forms/EditPublisherForm";

const PublisherPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { state, fetchPublishers, removePublisher } = usePublishers();
    const { hasRole } = useAuth();
    const isAdmin = hasRole('admin');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                await fetchPublishers();
            } catch (err) {
                setError('Failed to load publisher information');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [fetchPublishers]);

    const publisher = state.publishers.find(p => p._id === id);

    const handleEditClick = () => {
        setOpenEditDialog(true);
    };

    const handleEditClose = () => {
        setOpenEditDialog(false);
    };

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!id) return;

        try {
            await removePublisher(id);
            setSuccessMessage('Publisher deleted successfully');
            setTimeout(() => {
                navigate('/publishers');
            }, 2000);
        } catch (err) {
            setError('Failed to delete publisher');
            console.error(err);
        } finally {
            setDeleteDialogOpen(false);
        }
    };

    const handleCloseSnackbar = () => {
        setError(null);
        setSuccessMessage(null);
    };

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    if (!publisher) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="error">Publisher not found</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h4" component="h1" color="primary.main">
                        {publisher.name}
                    </Typography>

                    {isAdmin && (
                        <Box>
                            <Button
                                startIcon={<Edit />}
                                variant="outlined"
                                color="primary"
                                onClick={handleEditClick}
                                sx={{ mr: 1 }}
                            >
                                Edit
                            </Button>
                            <Button
                                startIcon={<Delete />}
                                variant="outlined"
                                color="error"
                                onClick={handleDeleteClick}
                            >
                                Delete
                            </Button>
                        </Box>
                    )}
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>
                    <Grid>
                        <Typography variant="subtitle1" color="text.secondary">Location</Typography>
                        <Typography variant="body1">{publisher.location || 'Not specified'}</Typography>
                    </Grid>

                    <Grid>
                        <Typography variant="subtitle1" color="text.secondary">Established Year</Typography>
                        <Typography variant="body1">{publisher.establishedYear || 'Not specified'}</Typography>
                    </Grid>

                    <Grid>
                        <Typography variant="subtitle1" color="text.secondary">Website</Typography>
                        {publisher.website ? (
                            <Typography variant="body1">
                                <a href={publisher.website} target="_blank" rel="noopener noreferrer">
                                    {publisher.website}
                                </a>
                            </Typography>
                        ) : (
                            <Typography variant="body1">Not specified</Typography>
                        )}
                    </Grid>
                </Grid>
            </Paper>

            {/* Edit Dialog */}
            <Dialog open={openEditDialog} onClose={handleEditClose} fullWidth maxWidth="sm">
                <DialogTitle>Edit Publisher</DialogTitle>
                <DialogContent>
                    <EditPublisherForm
                        publisher={publisher}
                        onSuccess={() => {
                            setOpenEditDialog(false);
                            setSuccessMessage('Publisher updated successfully');
                        }}
                        onCancel={handleEditClose}
                    />
                </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this publisher? This action cannot be undone.
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for error and success messages */}
            <Snackbar
                open={!!error || !!successMessage}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={error ? 'error' : 'success'}
                    sx={{ width: '100%' }}
                >
                    {error || successMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default PublisherPage;