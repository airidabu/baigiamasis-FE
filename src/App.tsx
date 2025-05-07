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
import RegistrationForm from "./components/forms/RegistrationForm.tsx";
import UnauthorizedPage from "./pages/UnauthorizedPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import EditBookPage from "./pages/EditBookPage.tsx";
import PublishersPage from "./pages/PublishersPage.tsx";
import { PublishersProvider } from "./contexts/PublishersContext.tsx";
import PublisherPage from "./pages/PublisherPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import { BooksProvider } from "./contexts/BooksContext.tsx";
import { GenresProvider } from "./contexts/GenresContext.tsx";
import { UsersProvider } from "./contexts/UsersContext.tsx";
import LoginPage from "./pages/LoginPage.tsx";

const App: React.FC = () => {

  return (
    <Router>
      <PublishersProvider>
        <BooksProvider>
          <GenresProvider>
            <UsersProvider>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegistrationForm />} />
                  <Route path="/genres" element={<GenresPage />} />
                  <Route path="/books" element={<BooksPage />} />
                  <Route path="/books/:id" element={<BookPage />} />
                  <Route path="/reviews" element={<ReviewsPage />} />
                  <Route path="/publishers" element={<PublishersPage />} />
                  <Route path="/publishers/:id" element={<PublisherPage />} />
                  <Route path="/unauthorized" element={<UnauthorizedPage />} />

                  <Route element={<ProtectedRoute allowedRoles={["admin", "user", "author"]} />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                  </Route>

                  <Route element={<ProtectedRoute allowedRoles={["admin", "author"]} />}>
                    <Route path="/books/edit/:id" element={<EditBookPage />} />
                  </Route>
                </Route>
              </Routes>
            </UsersProvider>
          </GenresProvider>
        </BooksProvider>
      </PublishersProvider>
    </Router>
  )
}

export default App
