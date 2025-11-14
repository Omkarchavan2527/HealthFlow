import { Component } from "react";
import { Link } from "react-router-dom";
interface SidebarProps {
  onProfilePicUpdate: (newPicUrl: string) => void;
  onCloseSidebar: () => void;
}

export default class Sidebar extends Component<SidebarProps> {
  
  handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const res = await fetch("http://localhost:5000/api/user/profile-pic", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      this.props.onProfilePicUpdate(data.profilePicUrl);
      this.props.onCloseSidebar(); // close after upload
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  handleLogout = () => {
    localStorage.removeItem("authToken");
    this.props.onCloseSidebar();
    window.location.href = "/login";
  };

  render() {
    return (
      <div className="p-4 flex flex-col gap-4 w-64">
        <h2 className="text-lg font-semibold">Profile Settings</h2>

        {/* Upload Profile Pic */}
        <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg text-center">
          Upload Profile Picture
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={this.handleFileChange}
          />
        </label>

        {/* Settings Link */}
        <Link
          to="/settings"
          className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-center"
          onClick={this.props.onCloseSidebar}
        >
          Settings
        </Link>

        {/* About Link */}
        <Link
          to="/about"
          className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 text-center"
          onClick={this.props.onCloseSidebar}
        >
          About
        </Link>

        {/* Logout Button */}
        <button
          onClick={this.handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    );
  }
}
