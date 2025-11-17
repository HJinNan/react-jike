import Login from "@/pages/Login";
import Layout from "@/pages/Layout";
import { createBrowserRouter as Router} from "react-router-dom";

const router = Router([
    {
        path: "/",
        mete:{
            tile: "layou"
        },
        element: <Layout />
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