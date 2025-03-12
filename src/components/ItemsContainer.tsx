import {ReactNode} from "react";
import styled from "styled-components";

type ItemContainerProps = {
    children: ReactNode;
}

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    padding: 30px;
    gap: 20px;
    
    @media (max-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
    
    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
    }
    
    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`

const ItemsContainer: React.FC<ItemContainerProps> = ({children}) => {
    return (
        <Container>
            {children}
        </Container>
    )
}

export default ItemsContainer;