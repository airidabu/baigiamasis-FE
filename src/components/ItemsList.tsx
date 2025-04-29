import {ReactNode} from "react";
import {List} from "@mui/material";

type ItemsListProps = {
    children: ReactNode;
}

const ItemsList: React.FC<ItemsListProps> = ({children}) => {
    return (
        <>
            <List sx={{ width: "100%", maxWidth: 200, bgcolor: "background.paper" }}>
                {children}
            </List>
        </>
    )
}

export default ItemsList;