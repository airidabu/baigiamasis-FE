import {ReactNode} from "react";

type ItemContainerProps = {
    children: ReactNode;
}

const ItemsContainer: React.FC<ItemContainerProps> = ({children}) => {
    return (
        <div>
            {children}
        </div>
    )
}

export default ItemsContainer;