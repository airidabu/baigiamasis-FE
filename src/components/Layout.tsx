import PageNavigation from "./PageNavigation.tsx";
import {Outlet} from "react-router";

const Layout: React.FC = () => {
    return (
        <>
            <PageNavigation/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}

export default Layout;