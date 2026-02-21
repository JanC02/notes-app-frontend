import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import NotesPage from "./pages/Notes";
import UnprotectedRoute from "./components/UnprotectedRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import NotesLayout from "./components/notes/NotesLayout.tsx";
import NewNote from "./pages/NewNote.tsx";
import EditNote from "./pages/EditNote.tsx";
import { noteLoader } from "./loaders/noteLoader.ts";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Navigate to="/notes" replace />
            },
            {
                path: 'login',
                element: <UnprotectedRoute>
                    <LoginPage />
                </UnprotectedRoute>
            },
            {
                path: 'register',
                element: <UnprotectedRoute>
                    <RegisterPage />
                </UnprotectedRoute>
            },
            {
                path: '/notes',
                element: <ProtectedRoute>
                    <NotesLayout />
                </ProtectedRoute>,
                children: [
                    {
                        index: true,
                        element: <NotesPage />,
                    },
                    {
                        path: 'new',
                        element: <NewNote />
                    },
                    {
                        path: ':id',
                        element: <EditNote />,
                        loader: noteLoader
                    }
                ]
            }
        ]
    }
]);