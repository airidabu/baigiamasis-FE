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
import LoginForm from "./components/forms/LoginForm.tsx";
import RegistrationForm from "./components/forms/RegistrationForm.tsx";
import UnauthorizedPage from "./pages/UnauthorizedPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import EditBookPage from "./pages/EditBookPage.tsx";
import PublishersPage from "./pages/PublishersPage.tsx";
import { PublishersProvider } from "./contexts/PublishersContext.tsx";
import PublisherPage from "./pages/PublisherPage.tsx";

const App: React.FC = () => {

  return (
    <Router>
      <PublishersProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/genres" element={<GenresPage />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/:id" element={<BookPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/publishers" element={<PublishersPage />} />
            <Route path="/publishers/:id" element={<PublisherPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route element={<ProtectedRoute allowedRoles={["admin", "author"]} />}>
              <Route path="/books/edit/:id" element={<EditBookPage />} />
            </Route>
          </Route>
        </Routes>
      </PublishersProvider>
    </Router>
  )
}

export default App
