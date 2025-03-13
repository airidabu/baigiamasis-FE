import * as React from "react";
import {AuthorsProvider} from "../contexts/AuthorsContext.tsx";
import AuthorsPageContent from "../components/AuthorsPageContent.tsx";

const AuthorsPage: React.FC = () => {
    return (
        <AuthorsProvider>
            <AuthorsPageContent/>
        </AuthorsProvider>
    )
}

export default AuthorsPage;