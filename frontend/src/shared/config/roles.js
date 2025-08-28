export const roles = {
    admin: 'admin',
    manager: 'manager',
    user: 'user',
    guest: 'guest',
}
export function getRolesArray() {
    return Object.values(roles);
}