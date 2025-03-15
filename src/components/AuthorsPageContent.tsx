import * as React from "react";
import {useAuthors} from "../contexts/AuthorsContext.tsx";
import {useEffect} from "react";
import Author from "../types/Author.ts";
import {Link} from "react-router";
import ItemsList from "./ItemsList.tsx";
import AuthorForm from "./forms/AuthorForm.tsx";
import {Divider, ListItem, ListItemText} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Box from "@mui/material/Box";


const AuthorsPageContent: React.FC = () => {
    const {state, fetchAuthors,removeAuthor } = useAuthors();

    useEffect(() => {
        fetchAuthors();
    }, []);

    const createAuthorElements = state.authors
        .map((author: Author) => (
            <ListItem
                key={author.id}
                disableGutters
                secondaryAction={
                <IconButton onClick={() => removeAuthor(author.id!)}>
                    <DeleteForeverIcon color="primary"/>
                </IconButton>
                }
            >
                <ListItemText primary={<Link  to={`/authors/${author.id}`}>{author.name}</Link>} />
            </ListItem>
        ));

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: {xs: "column", md:"row"},
                justifyContent: {md: "space-around", xs: "center"},
                gap: 2,
                maxWidth: "800px",
                margin: "auto",
                alignItems: "center",
            }}
        >
            <ItemsList children={createAuthorElements}></ItemsList>
            <Divider orientation="vertical" variant="middle"/>
            <AuthorForm/>
        </Box>
    )
}

export default AuthorsPageContent;