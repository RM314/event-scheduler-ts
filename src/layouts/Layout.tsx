import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Layout = () => {
  const { isAuthenticated, logout } = useAuth();

  function handleLogout() {
    logout();
    alert("User signed out successfully");
  }

  return (
    <div className="min-h-screen flex flex-col">

      <header className="border-b border-base-200">
        <nav className="max-w-6xl mx-auto px-4 py-4">
          <ul className="flex gap-4">
            <li><Link to="/" className="font-semibold">Home</Link></li>
            {isAuthenticated ? (
              <>
                <li><Link to="/events/new" className="font-semibold">New Event</Link></li>
                <li><button className="font-semibold cursor-pointer" onClick={handleLogout}>Sign Out</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login" className="font-semibold">Sign In</Link></li>
                <li><Link to="/register" className="font-semibold">Sign Up</Link></li>
              </>
            )}
          </ul>
        </nav>
      </header>

      <main className="flex-1 max-w-full mx-auto px-4 py-6">
        <Outlet />
      </main>

      <footer className="footer footer-center p-6 bg-base-200 text-base-content">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-center">
          <span>© {new Date().getFullYear()} Event App</span>
          <Link to="/legal" className="link link-hover">Legal Notice</Link>
          <Link to="/privacy" className="link link-hover">Privacy Policy</Link>
        </div>
      </footer>

    </div>
  );
};

export default Layout;