import Login from "@/pages/Login";
import Layout from "@/pages/Layout";
import { createBrowserRouter as Router} from "react-router-dom";
import { AuthRoute } from "@/components/AuthRoute";
// import Home from "@/pages/Home";
// import Article from "@/pages/Article";
// import Publish from "@/pages/Publish";
import {Suspense} from "react";

import {lazy} from "react";
const Home = lazy(() => import("@/pages/Home"));
const Article = lazy(() => import("@/pages/Article"));
const Publish = lazy(() => import("@/pages/Publish"));

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
                element: <Suspense fallback={<div>loading</div>}><Home /></Suspense>
            },
            {
                path: "article",
                element: <Suspense fallback={<div>loading</div>}><Article /></Suspense>
            },
            {
                path: "publish/:id?",
                element: <Suspense fallback={<div>loading</div>}><Publish /></Suspense> 
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