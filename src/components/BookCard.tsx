import {Paper} from "@mui/material";
import Box from "@mui/material/Box";

interface BookCardProps {
    imageUrl: string;
    title: string;
}

const BookCard: React.FC<BookCardProps> = ({imageUrl, title}) => {
    return (
        <Paper sx={{p: 2}} elevation={3}>
            <Box
                component="img"
                src={imageUrl}
                alt={title}
                width="100%"
            />
            <h2>{title}</h2>
        </Paper>
    )
}

export default BookCard;