import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import SignUpPage from "@/pages/SignUpPage";
import UsersPage from "@/pages/UsersPage";
import MainLayout from "@/widgets/layouts/MainLayout";
import { Component } from "react";
import { createBrowserRouter } from "react-router";

export const routes = [
    {
        path: "/",
        Component: MainLayout,
        children: [
            {
                index: true,

                Component: HomePage,
            },
            {
                path: "/users",
                Component: UsersPage,
            },
            {
                path: "/login",
                Component: LoginPage,
            },
            {
                path: "/signup",
                Component: SignUpPage,
            }
        ]
    },

];
const router = createBrowserRouter(routes);

export default router;