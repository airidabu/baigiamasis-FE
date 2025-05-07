import { Paper, Button, Collapse, Link, ListItem, ListItemText, IconButton, Container, Typography, List, Grid } from "@mui/material";
import PublishersForm from "../components/forms/PublishersForm";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { usePublishers } from "../contexts/PublishersContext";
import { DeleteForever } from "@mui/icons-material";
import { Link as RouterLink } from "react-router";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";

const PublishersPage = () => {
    const { userRole, isAuthenticated } = useAuth();
    const [isFormOpen, setFormOpen] = useState(false);
    const { fetchPublishers, state, removePublisher } = usePublishers();
    const [deletePublisherId, setDeletePublisherId] = useState<string | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    useEffect(() => {
        fetchPublishers();
    }, [fetchPublishers]);

    const handleOpenDeleteDialog = (id: string) => {
        setDeletePublisherId(id);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (deletePublisherId) {
            await removePublisher(deletePublisherId);
            setDeleteDialogOpen(false);
            setDeletePublisherId(null);
        }
    };

    const handleFormSuccess = () => {
        setFormOpen(false);
    };

    const createPublisherElements = state.publishers.map((publisher) => (
        <ListItem
            key={publisher._id}
            disableGutters
            secondaryAction={
                isAuthenticated && userRole === "admin" ? (
                    <IconButton onClick={() => handleOpenDeleteDialog(publisher._id)}>
                        <DeleteForever color="error" />
                    </IconButton>
                ) : null
            }
        >
            <Link
                component={RouterLink}
                to={`/publishers/${publisher._id}`}
                underline="hover"
                color="primary"
                sx={{ cursor: 'pointer' }}
            >
                <ListItemText primary={publisher.name} />
            </Link>
        </ListItem>
    ))

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" sx={{ my: 3, fontWeight: 500, color: "primary.main" }}>
                Publishers
            </Typography>
            <Grid container spacing={3}>
                <Grid>
                    <Paper
                        elevation={3}
                        sx={{
                            p: 2,
                            borderRadius: 2
                        }}
                    >
                        {state.publishers.length > 0 ? (
                            <List>
                                {createPublisherElements}
                            </List>
                        ) : (
                            <Typography sx={{ p: 2 }}>No publishers available</Typography>
                        )}
                    </Paper>
                </Grid>
                <Grid>
                    {isAuthenticated && userRole === "admin" && (
                        <>
                            <Button
                                variant="contained"
                                onClick={() => setFormOpen((prev) => !prev)}
                                sx={{ mb: 2, width: "100%" }}
                            >
                                {isFormOpen ? "Close Form" : "Add New Publisher"}
                            </Button>
                            <Collapse in={isFormOpen}>
                                <PublishersForm
                                    mode="create"
                                    onSuccess={handleFormSuccess}
                                />
                            </Collapse>
                        </>
                    )}
                </Grid>
            </Grid>

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
        </Container>
    )
}

export default PublishersPage;