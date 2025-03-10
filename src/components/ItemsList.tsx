type ItemsListProps = {
    children: React.ReactNode;
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