import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Box, Typography, Paper, Grid, Card, CardContent, CircularProgress } from "@mui/material";
import { useBooks } from "../contexts/BooksContext";
import { usePublishers } from "../contexts/PublishersContext";
import { useGenres } from "../contexts/GenresContext";

const DashboardPage = () => {
    const { isAuthenticated, userRole, user } = useAuth();
    const navigate = useNavigate();
    const { fetchBooks, state: booksState } = useBooks();
    const { fetchPublishers, state: publishersState } = usePublishers();
    const { fetchGenres, state: genresState } = useGenres();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        const loadData = async () => {
            setIsLoading(true);
            try {
                await Promise.all([
                    fetchBooks(),
                    fetchPublishers(),
                    fetchGenres()
                ]);
            } catch (error) {
                console.error("Error loading dashboard data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [isAuthenticated, navigate, fetchBooks, fetchPublishers, fetchGenres]);

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>
                <CircularProgress size={60} />
            </Box>
        );
    }

    const renderAdminDashboard = () => (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Admin Dashboard</Typography>
            <Grid container spacing={3}>
                <Grid >
                    <Card sx={{ height: "100%" }}>
                        <CardContent>
                            <Typography variant="h6" color="primary">Books</Typography>
                            <Typography variant="h3">{booksState.books.length}</Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>Total books in the system</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid>
                    <Card sx={{ height: "100%" }}>
                        <CardContent>
                            <Typography variant="h6" color="primary">Publishers</Typography>
                            <Typography variant="h3">{publishersState.publishers.length}</Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>Total publishers in the system</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid >
                    <Card sx={{ height: "100%" }}>
                        <CardContent>
                            <Typography variant="h6" color="primary">Genres</Typography>
                            <Typography variant="h3">{genresState.genres.length}</Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>Total genres in the system</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );

    const renderAuthorDashboard = () => (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Author Dashboard</Typography>
            <Grid container spacing={3}>
                <Grid>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" color="primary">My Books</Typography>
                            <Typography variant="h3">
                                {booksState.books.filter(book =>
                                    book.author && book.author._id === user?.id
                                ).length}
                            </Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>Books you've published</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" color="primary">Available Genres</Typography>
                            <Typography variant="h3">{genresState.genres.length}</Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>Genres you can use for your books</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );

    const renderUserDashboard = () => (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>User Dashboard</Typography>
            <Grid container spacing={3}>
                <Grid>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" color="primary">Available Books</Typography>
                            <Typography variant="h3">{booksState.books.length}</Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>Books available to read</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" color="primary">Book Categories</Typography>
                            <Typography variant="h3">{genresState.genres.length}</Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>Different genres to explore</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );

    return (
        <Paper elevation={3} sx={{ p: 3, maxWidth: 1200, mx: "auto", my: 3 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h3" gutterBottom>
                    Welcome, {user?.name}!
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    This is your personalized dashboard. Here you can see an overview of your account and the platform.
                </Typography>
            </Box>

            {userRole === "admin" && renderAdminDashboard()}
            {userRole === "author" && renderAuthorDashboard()}
            {userRole === "user" && renderUserDashboard()}
        </Paper>
    );
};

export default DashboardPage;