export const roles = {
    admin: 'admin',
    manager: 'manager',
    student: 'student',
    guest: 'guest',
}
export function getRolesArray() {
    return Object.values(roles);
}