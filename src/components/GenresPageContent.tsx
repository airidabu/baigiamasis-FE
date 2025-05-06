import GenresForm from "./forms/GenresForm.tsx";
import { useGenres } from "../contexts/GenresContext.tsx";
import { useEffect } from "react";
import ItemsList from "./ItemsList.tsx";
import Box from "@mui/material/Box";
import { Divider, ListItem, ListItemText } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAuth } from "../contexts/AuthContext.tsx";

const GenresPageContent: React.FC = () => {
    const { state, fetchGenres, removeGenre } = useGenres();
    const { userRole, isAuthenticated } = useAuth();

    useEffect(() => {
        fetchGenres();
    }, [fetchGenres]);

    const createGenreElements = state.genres.map((genre) => (
        <ListItem
            key={genre._id}
            disableGutters
            secondaryAction={
                isAuthenticated && userRole === "admin" ? (
                    <IconButton onClick={() => removeGenre(genre._id!)} aria-label="delete">
                        <DeleteForeverIcon color="primary" />
                    </IconButton>
                ) : null
            }
        >
            <ListItemText primary={genre.name} />
        </ListItem >
    ))

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: { md: "space-around", xs: "center" },
                gap: 2,
                maxWidth: "800px",
                margin: "auto",
                alignItems: "center",
            }}
        >
            <ItemsList children={createGenreElements}></ItemsList>
            {isAuthenticated && userRole === "admin" && (
                <>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <div>
                        <GenresForm />
                    </div>
                </>
            )}
        </Box>
    )
}

export default GenresPageContent;