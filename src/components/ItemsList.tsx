import { ReactNode } from "react";
import { List, Paper } from "@mui/material";

type ItemsListProps = {
    children: ReactNode;
}

const ItemsList: React.FC<ItemsListProps> = ({ children }) => {
    return (
        <Paper elevation={3} sx={{ px: 5 }}>
            <List sx={{ width: "100%", maxWidth: 200, bgcolor: "background.paper" }}>
                {children}
            </List>
        </Paper>
    )
}

export default ItemsList;