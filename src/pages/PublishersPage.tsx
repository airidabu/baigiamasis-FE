import { Box, Paper, Button, Collapse, ListItem, ListItemText, IconButton, Container, Typography, List, Grid } from "@mui/material";
import PublishersForm from "../components/forms/PublishersForm";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { usePublishers } from "../contexts/PublishersContext";
import { DeleteForever } from "@mui/icons-material";

const PublishersPage = () => {
    const { userRole, isAuthenticated } = useAuth();
    const [isFormOpen, setFormOpen] = useState(false);
    const { fetchPublishers, state, removePublisher, updatePublisherData } = usePublishers();

    useEffect(() => {
        fetchPublishers();
    }, [fetchPublishers]);

    const createPublisherElements = state.publishers.map((publisher) => (
        <ListItem
            key={publisher._id}
            disableGutters
            secondaryAction={
                isAuthenticated && userRole === "admin" ? (
                    <IconButton>
                        <DeleteForever color="primary" />
                    </IconButton>
                ) : null
            }
        >
            <ListItemText primary={publisher.name} />
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
                                <PublishersForm />
                            </Collapse>
                        </>
                    )}
                </Grid>
            </Grid>

        </Container>
    )
}

export default PublishersPage;