import {NavLink} from "react-router";
import styles from "./PageNavigation.module.css";

const PageNavigation: React.FC = () => {
    return (
        <nav className={styles.nav}>
            <NavLink to="/" end>
                Home
            </NavLink>
            <NavLink to="/authors">Authors</NavLink>
            <NavLink to="/books">Books</NavLink>
            <NavLink to="/genres">Genres</NavLink>
            <NavLink to="/reviews">Reviews</NavLink>
        </nav>
    )
}

export default PageNavigation;