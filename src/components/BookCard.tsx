interface BookCardProps {
    imageUrl: string;
    title: string;
}

const BookCard: React.FC<BookCardProps> = ({imageUrl, title}) => {
    return (
        <>
            <img src={imageUrl} alt=""/>
            <h1>{title}</h1>
        </>
    )
}

export default BookCard;