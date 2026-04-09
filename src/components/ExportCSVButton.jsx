import { exportCSV } from "../utilis/exportCSV"

export default function ExportCSVButton({ transactions }) {
  return (
    <button
      onClick={() => exportCSV(transactions)}
      className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition text-sm"
    >
      📥 Export CSV
    </button>
  )
}