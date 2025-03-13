import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-color: black;
    border-style: solid;
    padding: 10px;
    img {
        width: 200px;
        height: 300px;
    }
`

interface BookCardProps {
    imageUrl: string;
    title: string;
}

const BookCard: React.FC<BookCardProps> = ({imageUrl, title}) => {
    return (
        <Wrapper>
            <img src={imageUrl} alt=""/>
            <h1>{title}</h1>
        </Wrapper>
    )
}

export default BookCard;