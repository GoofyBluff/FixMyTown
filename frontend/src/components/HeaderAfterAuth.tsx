import { Link } from "react-router-dom";
import { Button } from "./ui/button.tsx";
import { LogIn, LogOut, Shield, LayoutDashboard } from "lucide-react";
import civicIssueLogo from "../assets/civic-issue.png";
import { useAuth } from "../contexts/AuthContext.tsx";

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => logout();

  return (
    <header
      className="
        w-full fixed top-0 left-0 right-0 z-50
        bg-white/30 backdrop-blur-md border-b border-gray-200/50
        supports-[backdrop-filter]:bg-white/30
      "
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
            <div className="flex items-center justify-center w-[50px] h-[50px] rounded-lg overflow-hidden">
              <img src={civicIssueLogo} alt="Civic Issue Logo" className="object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                CivicIssueReporter
              </h1>
              <p className="text-xs text-muted-foreground">
                Building Better Communities
              </p>
            </div>
          </Link>

          {/* Auth Section */}
          <div className="flex items-center space-x-3">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground hidden sm:block">
                  Welcome, {user?.fullName ? user.fullName.split(" ")[0] : "Guest"}!
                </span>
                <Link to={user.role === "citizen" ? "/citizen" : "/admin"}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2 text-slate-600 hover:text-blue-700"
                  >
                    <LayoutDashboard className="h-4 w-4 text-blue-700" />
                    <span className="hidden sm:block">Dashboard</span>
                  </Button>
                </Link>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="flex items-center space-x-2 text-slate-600 hover:text-blue-700"
                >
                  <LogOut className="h-4 w-4 text-blue-700" />
                  <span className="hidden sm:block">Logout</span>
                </Button>
              </>
            ) : (
              <>
                <Link to="/signin">
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden sm:flex items-center space-x-2 hover:text-blue-700"
                  >
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button
                    size="sm"
                    className="flex items-center space-x-2 civic-gradient border-0 text-white hover:opacity-90"
                  >
                    <Shield className="h-4 w-4" />
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
