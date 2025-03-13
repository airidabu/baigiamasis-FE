import {useEffect, useState, CSSProperties} from "react";
import {getBook} from "../api/books.ts";
import Book from "../types/Book.ts";
import {BounceLoader} from "react-spinners";
import styled from "styled-components";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "#5D001E"
}

const Wrapper = styled.div`
    padding: 25px;
    width: 300px;
    border-color: black;
    border-style: solid;
    p {
        margin: 0;
    }
`

interface ReviewCardProps {
    nickname: string;
    email: string;
    bookId: string;
    text: string;
    rating: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({nickname, email, bookId, text, rating}) => {
    const [book, setBook] = useState<Book>();

    useEffect(() => {
        getBook(bookId).then(fetchedBook => setBook(fetchedBook));
    }, [bookId]);

    return (
        <>
            {book ? (
                    <Wrapper>
                        <div>Review by {nickname} for {book.title}</div>
                        <div>{email}</div>
                        <div>Time posted </div>
                        <p>{text}</p>
                        <p>{rating}</p>
                    </Wrapper>
                ) : (
                    <div>
                       <BounceLoader
                       color="#5D001E"
                        cssOverride={override}
                       />
                    </div>
            )}
        </>
    )
}

export default ReviewCard;