import { UserList } from "@/widgets/userList/UserList";

function UsersPage() {
    return (
        <div className="container">
            <h1>Users Page</h1>
            <div>
                <UserList />
            </div>
        </div>
    );
}

export default UsersPage;