import { useState } from "react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifType, setNotifType] = useState("push");

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Profile Settings */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Profile</h2>
        <input
          type="text"
          placeholder="Update name"
          className="border rounded px-3 py-2 w-full mb-2"
        />
        <input
          type="email"
          placeholder="Update email"
          className="border rounded px-3 py-2 w-full mb-2"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Profile
        </button>
      </section>

      {/* Medicine Preferences */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Medicine Preferences</h2>
        <label className="block mb-2">Reminder Type:</label>
        <select
          value={notifType}
          onChange={(e) => setNotifType(e.target.value)}
          className="border rounded px-3 py-2 w-full mb-2"
        >
          <option value="push">Push Notification</option>
          <option value="sms">SMS</option>
          <option value="email">Email</option>
        </select>
      </section>

      {/* App Preferences */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">App Preferences</h2>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
          Enable Dark Mode
        </label>
      </section>

      {/* Logout */}
      <button className="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
};

export default Settings;
