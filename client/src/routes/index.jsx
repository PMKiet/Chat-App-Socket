import { createBrowserRouter } from "react-router-dom"
import App from "../App.jsx"
import RegisterPage from "../pages/RegisterPage.jsx"
import HomePage from "../pages/HomePage.jsx"
import MessagePage from "../components/MessagePage.jsx"
import { AuthLayout } from "../layout/index.jsx"

const router = createBrowserRouter([
    {
        path: '/',
        element: <App></App>,
        children: [
            {
                path: '/register',
                element: <AuthLayout> <RegisterPage /> </AuthLayout>
            },
            {
                path: '/home',
                element: <HomePage />,
                children: [
                    {
                        path: ':userId',
                        element: <MessagePage />
                    }
                ]
            }
        ]
    }
])

export default router