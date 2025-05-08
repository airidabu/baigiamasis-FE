# Book Management System

This is a comprehensive web application built with React, TypeScript, and Vite for managing books and related content. The app provides a full-featured interface for browsing and managing books, reviews, publishers, and genres.

## Features

- **Authentication System**: User registration, login, and profile management
- **Books Management**: Browse, search, add, edit, and delete books
- **Reviews System**: Users can leave reviews and ratings for books
- **Publishers Management**: Admin users can manage publisher information
- **Genres Management**: Browse and manage book genres
- **User Dashboard**: Personalized user dashboard for managing content
- **Responsive Design**: Mobile-friendly interface using Material UI
- **Role-Based Access Control**: Different permissions for regular users, authors, and admins
- **Dark/Light Theme**: Toggle between light and dark modes

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **UI Library**: Material UI v7
- **Routing**: React Router v7
- **API Client**: Axios
- **Date Handling**: date-fns
- **Authentication**: JWT

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd baigiamasis-atsiskaitymas/fe
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
   VITE_API_URL=http://localhost:3000
   ```
   Adjust the URL if your backend is running on a different port or host.

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. The application will be available at `http://localhost:5173` (or the port specified by Vite).

## Building for Production

```bash
npm run build
# or
yarn build
```

The built files will be available in the `dist` directory.

## Backend Repository

The backend for this application is available at:
[https://github.com/airidabu/baigiamasis-BE](https://github.com/airidabu/baigiamasis-BE)

## User Roles

- **Admin**: Full access to all features, including managing publishers and genres
- **Author**: Can create and manage their own books
- **User**: Can browse books, leave reviews, and manage their profile

## License

This project is licensed under the MIT License - see the LICENSE file for details.