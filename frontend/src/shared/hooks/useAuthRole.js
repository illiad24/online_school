// hooks/useAuthRole.js

import { selectAuthUser } from "@/features/auth";
import { useSelector } from "react-redux";


export function useAuthRole() {
    const user = useSelector(selectAuthUser);
    const userRole = user?.role?.title;
    const isSuperAdmin = userRole === 'admin'
    const isAdmin = userRole === "admin" || userRole === "manager";
    const isStudent = userRole === "student";

    return { user, userRole, isSuperAdmin, isAdmin, isStudent };
}
