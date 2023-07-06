import getConversations from "../actions/getConversations"
import getUsers from "../actions/getUsers"
import Sidebar from "../components/sIdebar/Sidebar"
import ConversationList from "./components/ConversationList"

export default async function ConversationLayout({
    children
}: {
    children: React.ReactNode
}) {
    const conversations = await getConversations()
    const users = await getUsers()

    return (
        <Sidebar>
            <div className="h-full">
                <ConversationList
                    initialItems={conversations}
                    users={users}
                />
                {children}
            </div>
        </Sidebar>
    )
}