import {ReactNode} from "react";
import Box from "@mui/material/Box";

type ItemContainerProps = {
    children: ReactNode;
}

const ItemsContainer: React.FC<ItemContainerProps> = ({children}) => {
    return (
        <Box sx={{display: "flex", flexWrap:"wrap", gap: 2}}>
            {children}
        </Box>
    )
}

export default ItemsContainer;