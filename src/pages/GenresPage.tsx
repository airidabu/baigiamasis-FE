import {GenresProvider} from "../contexts/GenresContext.tsx";
import GenresPageContent from "../components/GenresPageContent.tsx";

const GenresPage: React.FC = () =>{
    return (
        <GenresProvider>
            <GenresPageContent/>
        </GenresProvider>
    )
}

export default GenresPage;