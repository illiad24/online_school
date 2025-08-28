import { UserList } from "@/widgets/userList/UserList";

function UsersPage() {
    return (
        <div className="container">
            <h1 className='main-title'>Users Page</h1>
            <div>
                <UserList />
            </div>
        </div>
    );
}

export default UsersPage;