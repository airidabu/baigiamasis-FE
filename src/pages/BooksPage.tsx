import {BooksProvider} from "../contexts/BooksContext.tsx";
import BooksPageContent from "../components/BooksPageContent.tsx";

const BooksPage:React.FC = () =>{
    return(
        <BooksProvider>
            <BooksPageContent/>
        </BooksProvider>
    )
}

export default BooksPage;