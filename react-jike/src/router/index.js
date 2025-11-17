import Login from "@/pages/Login";
import Layout from "@/pages/Layout";
import { createBrowserRouter as Router} from "react-router-dom";
import { AuthRoute } from "@/components/AuthRoute";

const router = Router([
    {
        path: "/",
        mete:{
            tile: "layou"
        },
        element: <AuthRoute><Layout /></AuthRoute>
    },
    {
        path: "/login",
        mate: {
            title: "login"
        },
        element: <Login />
    }
])

export default router;