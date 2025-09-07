import { Component } from 'react';
import { projectInfo, navItems } from '../data';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface NavBarProps {
  onToggleSidebar: () => void;
  sidebarVisible: boolean;
}

export interface NavBarState {
  mobileMenuOpen: boolean;
  profilePic: string | null;
}

export class NavBar extends Component<NavBarProps, NavBarState> {
  state: NavBarState = {
    mobileMenuOpen: false,
    profilePic: null,
  };

  componentDidMount() {
    // Fetch profile pic from backend
    fetch("http://localhost:5000/api/user/profile-pic")
      .then((res) => res.json())
      .then((data) => {
        if (data.profilePicUrl) {
          this.setState({ profilePic: data.profilePicUrl });
        }
      })
      .catch((err) => console.error("Failed to fetch profile pic:", err));
  }

  handleProfilePicUpdate = (newPicUrl: string) => {
    this.setState({ profilePic: newPicUrl });
  };

  toggleMobileMenu = () => {
    this.setState((prev) => ({ mobileMenuOpen: !prev.mobileMenuOpen }));
  };

  closeMobileMenu = () => {
    this.setState({ mobileMenuOpen: false });
  };

  closeSidebar = () => {
    if (this.props.sidebarVisible) {
      this.props.onToggleSidebar();
    }
  };

  renderNavItems() {
    return navItems.map((navItem, index) =>
      navItem.link ? (
        <Link
          to={navItem.link}
          className={navItem.className}
          key={index}
          onClick={this.closeMobileMenu} // close mobile menu on click
        >
          {navItem.name}
        </Link>
      ) : (
        <div className={navItem.className} key={index}>
          {navItem.name}
        </div>
      )
    );
  }

  render() {
    const { onToggleSidebar, sidebarVisible } = this.props;
    const { mobileMenuOpen, profilePic } = this.state;

    return (
      <div className="navbar w-full py-2 flex items-center bg-white dark:bg-gray-800 shadow-md px-4 relative">

        {/* LEFT: Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <img
            src={projectInfo[0].logo}
            alt="logo"
            className="h-10 w-auto md:h-12"
          />
          <img
            src="logo5.png"
            alt="logo-alt"
            className="h-12 w-auto md:h-16"
          />
        </div>

        {/* CENTER: Nav Links (lg only) */}
        <div className="hidden lg:flex flex-grow justify-center gap-x-10">
          {this.renderNavItems()}
        </div>

        {/* RIGHT: Search + About + Profile + Hamburger */}
        <div className="flex items-center gap-4 md:gap-6 flex-shrink-0 ml-auto">
          {/* Search (lg only) */}
          <form className="hidden lg:block w-full max-w-xs">
            <label htmlFor="search" className="sr-only">Search</label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search"
                className="block w-full ps-10 text-sm md:text-lg border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
          </form>

          {/* About (md+ only) */}
          <Link
            to="/about"
            className="hidden md:block text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
          >
            About
          </Link>

          {/* Profile Pic */}
          <div className="relative">
            <button onClick={onToggleSidebar}>
              <img
                src={profilePic || "/defaultp.png"}
                alt="profile-pic"
                className="h-10 w-10 md:h-12 md:w-12 lg:w-16 rounded-full object-cover"
              />
            </button>

            {/* Sidebar Dropdown */}
            {sidebarVisible && (
              <div className="absolute top-full right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-50 w-64">
                <Sidebar
                  onProfilePicUpdate={this.handleProfilePicUpdate}
                  onCloseSidebar={this.closeSidebar} // close on link click
                />
              </div>
            )}
          </div>

          {/* Hamburger Menu (sm + md only) */}
          <button
            onClick={this.toggleMobileMenu}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu className="h-6 w-6 text-gray-800 dark:text-white" />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25 }}
              className="absolute top-full left-0 w-full bg-white dark:bg-gray-800 shadow-md flex flex-col items-start py-4 px-6 gap-4 lg:hidden z-40"
            >
              {this.renderNavItems()}
              <Link
                to="/about"
                className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                onClick={this.closeMobileMenu}
              >
                About
              </Link>
              <Link
                to="/settings"
                className="text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                onClick={this.closeMobileMenu}
              >
                Settings
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
}

export default NavBar;
