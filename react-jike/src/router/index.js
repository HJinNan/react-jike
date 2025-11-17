import Login from "@/pages/Login";
import Layout from "@/pages/Layout";
import { createBrowserRouter as Router} from "react-router-dom";
import { AuthRoute } from "@/components/AuthRoute";
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";

const router = Router([
    {
        path: "/",
        mete:{
            tile: "layou"
        },
        element: <AuthRoute><Layout /></AuthRoute>,
        children: [
            {
                path: "home",
                element: <Home />
            },
            {
                path: "article",
                element: <Article />
            },
            {
                path: "publish",
                element: <Publish />
            }
        ]
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