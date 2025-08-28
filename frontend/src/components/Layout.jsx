import SideBar from "./Sidebar"
import Navbar from "./Navbar"

const Layout = ({ children, showSidebar = false }) => {
    return (
        <div className="min-h-screen bg-base-100">
            <div className="flex min-h-screen">
                {showSidebar && <SideBar />}

                <div className="flex-1 flex flex-col">
                    <Navbar />

                    <main className="flex-1 overflow-y-auto">{children}</main>

                </div>

            </div>
        </div>
    )
}

export default Layout