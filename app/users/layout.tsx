import getUsers from "../actions/getUsers"
import Sidebar from "../components/sIdebar/Sidebar"
import UserList from "./components/UserList"

const layout: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
    const users = await getUsers()
    return (
        <Sidebar>

            <div className="h-full">
                <UserList
                    users={users}
                />
                {children}
            </div>
        </Sidebar>
    )
}
export default layout