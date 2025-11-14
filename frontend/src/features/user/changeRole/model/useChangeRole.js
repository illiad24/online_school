import { useUpdateUserRoleMutation } from "@/entities/user/api/userApi";
import { useState } from "react";

export function useChangeRole() {
    const [changedRole, setChangedRole] = useState({ userId: null, role: "" });
    const [updateUserRole] = useUpdateUserRoleMutation()


    const handleChange = (userId) => async (e) => {
        const role = e.target.value;

        setChangedRole({ userId, role });

        try {
            await updateUserRole({ id: userId, role }).unwrap();
        } catch (err) {
            console.error("Failed to update user role:", err);
        }
    };

    return { changedRole, handleChange };
}