import "./App.css";
import HomePage from "./pages/HomePage.tsx";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router";
import Layout from "./components/Layout.tsx";
import GenresPage from "./pages/GenresPage.tsx";
import BooksPage from "./pages/BooksPage.tsx";
import BookPage from "./pages/BookPage.tsx";
import ReviewsPage from "./pages/ReviewsPage.tsx";

const App: React.FC = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/genres" element={<GenresPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/books/:id" element={<BookPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
