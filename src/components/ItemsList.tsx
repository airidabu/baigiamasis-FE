import {ReactNode} from "react";

type ItemsListProps = {
    children: ReactNode;
}

const ItemsList: React.FC<ItemsListProps> = ({children}) => {
    return (
        <>
            <ul>
                {children}
            </ul>
        </>
    )
}

export default ItemsList;