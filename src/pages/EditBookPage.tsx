import BooksForm from "../components/forms/BooksForm";
import { BooksProvider } from "../contexts/BooksContext";

const EditBookPage: React.FC = () => {
    return (
        <BooksProvider>
            <div>
                <h1>Edit Book</h1>
                <BooksForm />
            </div>
        </BooksProvider>
    );
}

export default EditBookPage;