import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";

const App = () => {
  const location = useLocation();

  const authPages = ["/login", "/register"];
  const isAuthPage = authPages.includes(location.pathname);

  if (isAuthPage) {
    return <Outlet />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1 p-6">
          <Outlet />
        </main>
      </div>

      <footer className="border-t border-gray-200 bg-white px-6 py-4 text-center text-sm text-gray-500">
        © 2026 TaskFlow. All rights reserved.
      </footer>
    </div>
  );
};

export default App;