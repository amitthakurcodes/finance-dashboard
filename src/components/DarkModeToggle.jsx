import { useEffect, useState } from "react"

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark")
      setDark(true)
    }
  }, [])

  const toggleDarkMode = () => {
    if (dark) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setDark(false)
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setDark(true)
    }
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="px-3 py-2 rounded bg-gray-200 dark:bg-gray-700 text-sm text-gray-800 dark:text-white"
    >
      {dark ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  )
}