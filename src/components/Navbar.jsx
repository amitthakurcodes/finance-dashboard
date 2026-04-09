import DarkModeToggle from "./DarkModeToggle"

export default function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow flex flex-col sm:flex-row justify-between items-center px-4 py-3 gap-3">

      {/* ✅ Logo / Title */}
      <h1 className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
        💰 Finance Dashboard
      </h1>

      {/* ✅ Right Section */}
      <div className="flex items-center gap-3 flex-wrap justify-center">

        {/* 🌙 Dark Mode Toggle */}
        <DarkModeToggle />

        {/* 👤 User Email */}
        <span className="text-xs text-gray-500 dark:text-gray-300">
          {user?.email}
        </span>

        {/* 🚪 Logout Button */}
        <button 
          onClick={onLogout} 
          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
        >
          Logout
        </button>

      </div>
    </nav>
  )
}