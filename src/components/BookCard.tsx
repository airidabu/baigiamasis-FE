import { Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";

interface BookCardProps {
    imageUrl: string;
    title: string;
}

const BookCard: React.FC<BookCardProps> = ({ imageUrl, title }) => {
    return (
        <Paper
            sx={{
                p: 2,
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
            elevation={3}>
            <Box
                component="img"
                src={imageUrl}
                alt={title}
                sx={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                }}
            />
            <Typography
                variant="h6"
                sx={{
                    mt: 2,
                    textAlign: "center",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                }}
            >
                {title}
            </Typography>
        </Paper>
    )
}

export default BookCard;