import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Box, Typography, Paper, Grid, Card, CardContent, CircularProgress, Button, List, ListItem, ListItemText, Divider } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import { useBooks } from "../contexts/BooksContext";
import { usePublishers } from "../contexts/PublishersContext";
import { useGenres } from "../contexts/GenresContext";
import { useUsers } from "../contexts/UsersContext";
import EditProfileForm from "../components/forms/EditProfileForm";
import Book from "../types/Book";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const DashboardPage = () => {
    const { isAuthenticated, userRole, user } = useAuth();
    const navigate = useNavigate();
    const { fetchBooks, state: booksState } = useBooks();
    const { fetchPublishers, state: publishersState } = usePublishers();
    const { fetchGenres, state: genresState } = useGenres();
    const { fetchUsers, state: usersState } = useUsers();
    const [isLoading, setIsLoading] = useState(true);
    const [editProfileOpen, setEditProfileOpen] = useState(false);
    const [pendingBooks, setPendingBooks] = useState<Book[]>([]);

    const fetchPendingBooks = async () => {
        try {
            const response = await fetch(`${API_URL}/books/status/pending`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch pending books');
            const data = await response.json();
            setPendingBooks(data);
        } catch (error) {
            console.error("Error fetching pending books:", error);
        }
    };

    const approveBook = async (bookId: string) => {
        try {
            const response = await fetch(`${API_URL}/status/${bookId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ status: 'approved' })
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error(`Failed to approve book: ${response.status}`, errorText);
                throw new Error(`Failed to approve book: ${response.status}`);
            }

            setPendingBooks(prevBooks => prevBooks.filter(book => book._id !== bookId));

            fetchBooks();
        } catch (error) {
            console.error("Error approving book:", error);
        }
    }

    const loadData = async () => {
        setIsLoading(true);
        try {
            await Promise.all([
                fetchBooks(),
                fetchPublishers(),
                fetchGenres(),
                userRole === 'admin' ? fetchUsers() : Promise.resolve(),
                userRole === 'admin' ? fetchPendingBooks() : Promise.resolve()
            ]);
        } catch (error) {
            console.error("Error loading dashboard data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        loadData();
    }, [isAuthenticated, navigate, userRole]);

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
                <Grid >
                    <Card sx={{ height: "100%" }}>
                        <CardContent>
                            <Typography variant="h6" color="primary">Users</Typography>
                            <Typography variant="h3">{usersState.users.length}</Typography>
                            <Typography variant="body2" sx={{ mt: 1 }}>Total users in the system</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h5" sx={{ mb: 2 }}>Pending Books</Typography>
                <Paper elevation={2} sx={{ p: 2 }}>
                    {pendingBooks.length > 0 ? (
                        <List>
                            {pendingBooks.map((book, index) => (
                                <div key={book._id}>
                                    <ListItem>
                                        <ListItemText
                                            primary={book.name}
                                            secondary={
                                                <>
                                                    <Typography component="span" variant="body2">
                                                        Author: {book.author?.name} {book.author?.surname || ''}
                                                    </Typography>
                                                    <br />
                                                    <Typography component="span" variant="body2">
                                                        Publisher: {book.publisher?.name || 'Unknown'} | Status: Pending
                                                    </Typography>
                                                </>
                                            }
                                        />
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            onClick={() => navigate(`/books/${book._id}`)}
                                        >
                                            View Details
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            onClick={() => approveBook(book._id!)}
                                            sx={{ ml: 1 }}
                                        >
                                            Approve
                                        </Button>
                                    </ListItem>
                                    {index < pendingBooks.length - 1 && <Divider />}
                                </div>
                            ))}
                        </List>
                    ) : (
                        <Typography variant="body1">No pending books at the moment</Typography>
                    )}
                </Paper>
            </Box>
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

    const handleProfileUpdateSuccess = () => {
        loadData();
    };

    return (
        <Paper elevation={3} sx={{ p: 3, maxWidth: 1200, mx: "auto", my: 3 }}>
            <Box sx={{ mb: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h3" gutterBottom>
                    Welcome, {user?.name}!
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<EditIcon />}
                    onClick={() => setEditProfileOpen(true)}
                >
                    Edit Profile
                </Button>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                This is your personalized dashboard. Here you can see an overview of your account and the platform.
            </Typography>

            {userRole === "admin" && renderAdminDashboard()}
            {userRole === "author" && renderAuthorDashboard()}
            {userRole === "user" && renderUserDashboard()}

            <EditProfileForm
                open={editProfileOpen}
                onClose={() => setEditProfileOpen(false)}
                onSuccess={handleProfileUpdateSuccess}
            />
        </Paper>
    );
};

export default DashboardPage;