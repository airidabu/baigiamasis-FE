import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
        text-align: center;
    }
    
    img {
        width: 400px;
    }
`

const HomePage: React.FC = () => {
    return (
        <Container>
            <h1>Welcome to the Books Page</h1>
            <img src="src/assets/smiley-face.png" alt="smiley face"/>
        </Container>
    )
}

export default HomePage;