import { useState } from "react";

export function useChangeRole() {
    // зберігаємо id і нову роль
    const [changedRole, setChangedRole] = useState({ userId: null, role: "" });

    const handleChange = async (userId) => (e) => {
        console.log(userId)
        setChangedRole({ userId, role: e.target.value });

    };

    return { changedRole, handleChange };
}